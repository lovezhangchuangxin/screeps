/**
 * 类型字面量
 */
export type TypeLiteral =
  | 'string'
  | 'number'
  | 'boolean'
  | 'null'
  | 'undefined'
  | 'symbol'
  | 'array'

/**
 * 类型字面量到类型的映射类型
 */
export type TypeLiteralMap = {
  string: string
  number: number
  boolean: boolean
  null: null
  undefined: undefined
  symbol: symbol
  array: any[]
}

/**
 * 类型字面量转类型
 *
 * @example
 * ```ts
 * type Result = LiteralToType<'string'> // string
 * ```
 */
export type LiteralToType<T extends TypeLiteral> = TypeLiteralMap[T]

/**
 * 对象数组转相同个数的元组类型
 *
 * @example
 * ```ts
 * type Obj = [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 2 },
 * ]
 * type Result = ObjectArrayToTuple<Obj> // [string, string]
 */
export type ObjectArrayToTuple<T extends Record<string, any>[]> = {
  [P in keyof T]: string
}

/**
 * 对象数组类型按键转元组类型
 *
 * @example
 * ```ts
 * type Obj = [
 *  { name: 'a', age: 1 },
 *  { name: 'b', age: 2 },
 * ]
 * type Result = ObjectArrayToTuple<Obj, 'name'> // ['a', 'b']
 * ```
 */
export type ObjectArrayToTupleByKey<
  T extends Record<string, any>[],
  K extends keyof T[0],
> = {
  [P in keyof T]: T[P][K]
}
