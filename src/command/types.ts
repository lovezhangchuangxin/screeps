import { LiteralToType, ObjectArrayToTuple } from '../utils/types'

/**
 * 输出到 webview 的回调函数
 */
export type OutputCallback = (output: string, done: boolean) => void

/**
 * 创建命令配置对象
 */
export const createCommanderConfig = <
  Args extends CommanderArgument[],
  Opts extends CommanderOption[],
>(
  config: CommanderConfig<Args, Opts>,
) => config

/**
 * 命令配置
 */
export interface CommanderConfig<
  Args extends CommanderArgument[] = CommanderArgument[],
  Opts extends CommanderOption[] = CommanderOption[],
> {
  /**
   * 命令名称
   */
  name: string
  /**
   * 命令描述
   */
  desc: string
  /**
   * 命令参数配置
   */
  args?: Args
  /**
   * 命令选项配置
   */
  opts?: Opts
  /**
   * 命令处理函数
   */
  handler: CommanderHandler<ObjectArrayToTuple<Args>, OptsToOptMap<Opts>>
}

/**
 * 命令参数配置
 */
export interface CommanderArgument {
  /**
   * 参数名称
   */
  name: string
  /**
   * 参数描述
   */
  desc: string
}

/**
 * 命令选项配置
 */
export interface CommanderOption {
  /**
   * 选项名称
   */
  name: string
  /**
   * 选项描述
   */
  desc: string
  /**
   * 选项类型
   */
  type: OptionType
  /**
   * 选项别名
   */
  alias?: string | string[]
  /**
   * 选项默认值
   */
  defaultValue?: string
  /**
   * 选项是否必填
   */
  required?: boolean
}

/**
 * 命令处理函数
 */
export type CommanderHandler<ArgsType, OptsType> = (
  args: ArgsType,
  opts: OptsType,
  log: OutputCallback,
) => void

/**
 * 选项类型
 */
export type OptionType = 'string' | 'boolean' | 'number' | 'array'

/**
 * 别名配置
 */
export type AliasConfig = Record<string, string | string[]>

/**
 * 默认值配置
 */
export type DefaultConfig = Record<string, any>

/**
 * 选项数组类型转选项名称到类型的映射类型
 *
 * @example
 * ```ts
 * type Opts = [
 *  { name: 'a', type: 'string', desc: 'a' },
 *  { name: 'b', type: 'number'. desc: 'b' },
 * ]
 * type Result = OptsToOptMap<Opts> // { a: string} & { b: number }
 */
type OptsToOptMap<
  Opts extends CommanderOption[],
  Res extends DefaultConfig = {},
> = Opts extends [infer O, ...infer R]
  ? O extends CommanderOption
    ? R extends CommanderOption[]
      ? OptsToOptMap<
          R,
          Res & {
            [K in O['name']]: LiteralToType<O['type']>
          }
        >
      : Res
    : Res
  : Res
