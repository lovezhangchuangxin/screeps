import { getApi } from '../api/core'
import Commander from './commander'
import { loginCommandConfig } from './configs/login'
import { resourceCommandConfig } from './configs/resource'
import { userInfoCommandConfig } from './configs/userInfo'
import { CommanderConfig, OutputCallback } from './types'

const configs = [
  loginCommandConfig,
  userInfoCommandConfig,
  resourceCommandConfig,
]

export default class ScreepsProgram {
  /**
   * Screeps程序单例，用于执行命令
   */
  public static program: ScreepsProgram

  /**
   * 命令列表
   */
  public commanders: Commander[] = []

  /**
   * 构造函数，不允许外部调用
   */
  private constructor() {
    this.commanders = configs.map(
      (config) => new Commander(config as CommanderConfig),
    )
  }

  public static getInstance() {
    if (!this.program) {
      this.program = new ScreepsProgram()
    }

    return this.program
  }

  /**
   * 执行指令
   */
  public exec(command: string, log: OutputCallback) {
    const [cmd, ...args] = command.trim().split(' ')

    try {
      if (!this.testLogin()) {
        log('请先使用login命令登录', true)
        return
      }

      if (cmd === 'help') {
        this.execHelp(args, log)
        return
      }

      const commander = this.commanders.find((c) => c.name === cmd)
      if (commander) {
        commander.run(args, log)
      } else {
        log(this.unknownCommand(cmd), true)
      }
    } catch (error) {
      log(`Command ${cmd} 执行出错，参数：${JSON.stringify(args)}`, true)
    }
  }

  /**
   * 执行 help 指令
   */
  public execHelp(args: string[], log: OutputCallback) {
    const commander = this.commanders.find((c) => c.name === args[0])
    if (commander) {
      log(commander.help(), true)
    } else {
      log(this.help(), true)
    }
  }

  /**
   * 测试登录状态
   */
  public testLogin() {
    const api = getApi()
    return !!api.getToken()
  }

  /**
   * 返回帮忙信息
   */
  public help() {
    const maxLen = this.commanders.reduce(
      (max, cmd) => (cmd.name.length > max ? cmd.name.length : max),
      0,
    )

    return this.commanders
      .map((cmd) => `${cmd.name.padEnd(maxLen + 4, ' ')}${cmd.desc}`)
      .join('\n')
  }

  /**
   * 处理未知指令
   */
  public unknownCommand(command: string) {
    return `Unknown command: ${command}`
  }
}
