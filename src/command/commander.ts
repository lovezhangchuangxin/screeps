import parseArgs from 'minimist'
import {
  AliasConfig,
  CommanderConfig,
  DefaultConfig,
  OutputCallback,
} from './types'

export default class Commander {
  /**
   * 命令名称
   */
  public name: string
  /**
   * 命令描述
   */
  public desc: string
  /**
   * 别名配置
   */
  protected _alias?: AliasConfig = {}
  /**
   * 默认值配置
   */
  protected _default?: DefaultConfig = {}

  /**
   * 构造函数
   *
   * @param config 命令配置
   */
  constructor(public config: CommanderConfig) {
    this.name = config.name
    this.desc = config.desc
  }

  /**
   * 获取帮助信息
   *
   * @returns 帮助信息
   */
  public help() {
    const { name, desc, args, opts } = this.config

    // Usage部分
    const argsUsage = args?.map((arg) => `<${arg.name}>`).join(' ') || ''
    console.log(name, argsUsage)
    const optsUsage = opts?.length ? '[选项]' : ''
    const usage = `用法：${name} ${optsUsage}${argsUsage ? ' ' + argsUsage : ''}\n\n`

    // 描述部分
    const description = desc ? `${desc}\n\n` : ''

    // 参数部分
    const argumentsSection = args?.length
      ? `参数：\n${args.map((arg) => `  ${arg.name.padEnd(15)} ${arg.desc}`).join('\n')}\n\n`
      : ''

    // 选项部分
    const optionsSection = opts?.length
      ? `选项：\n${opts
          .map((option) => {
            // 处理别名
            const aliasList = option.alias
              ? (Array.isArray(option.alias)
                  ? option.alias
                  : [option.alias]
                ).map((a) => `-${a}`)
              : []
            const fullOption = [...aliasList, `--${option.name}`].join(', ')

            // 处理类型
            const typePart =
              option.type !== 'boolean' ? ` <${option.type}>` : ''

            // 处理默认值和必填
            const metaParts = [
              option.defaultValue !== undefined
                ? `默认：${option.defaultValue}`
                : '',
              option.required ? '必填' : '',
            ]
              .filter(Boolean)
              .join('，')

            return `  ${fullOption}${typePart.padEnd(10)} ${option.desc}${metaParts ? ` (${metaParts})` : ''}`
          })
          .join('\n')}\n`
      : ''

    // 合并所有部分
    return `${usage}${description}${argumentsSection}${optionsSection}`
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
  }

  /**
   * 获取别名配置
   */
  public getAlias() {
    if (this._alias) return this._alias

    const opts = this.config.opts
    if (!opts) {
      return (this._alias = {})
    }

    this._alias = opts.reduce((alias, option) => {
      if (option.alias) {
        alias[option.name] = option.alias
      }
      return alias
    }, {} as AliasConfig)
  }

  /**
   * 获取默认值配置
   */
  public getDefault() {
    if (this._default) return this._default

    const opts = this.config.opts
    if (!opts) {
      return (this._default = {})
    }

    this._default = opts.reduce((defaultValue, option) => {
      if (option.defaultValue) {
        defaultValue[option.name] = option.defaultValue
      }
      return defaultValue
    }, {} as DefaultConfig)
  }

  /**
   * 解析命令参数
   */
  parse(args: string[]) {
    return parseArgs(args, {
      alias: this.getAlias(),
      default: this.getDefault(),
    })
  }

  /**
   * 校验参数
   */
  validateArgs(args: string[], log: OutputCallback) {
    const { args: configArgs } = this.config
    if (!configArgs) return true
    const warnings = []
    let min = Math.min(args.length, configArgs.length)
    for (min; min < configArgs.length; min++) {
      warnings.push(`缺少必要参数 ${configArgs[min].name}`)
    }
    if (warnings.length) {
      log(warnings.join('\n'), true)
      return false
    }
    return true
  }

  /**
   * 执行命令
   *
   * @param args 命令参数
   */
  async run(args: string[], log: OutputCallback) {
    try {
      const parsedArgs = this.parse(args)
      if (!this.validateArgs(parsedArgs._, log)) return

      this.config.handler(parsedArgs._, parsedArgs, log)
    } catch (error) {}
  }
}
