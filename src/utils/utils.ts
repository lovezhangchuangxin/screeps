/**
 * 分割一个数字为字符串
 * @param num 数字
 */
export const splitNum = (num: number) => {
  if (num < 1000) return num.toString()
  let str = ''
  str += (num % 1000).toString().padStart(3, '0')
  num = Math.floor(num / 1000)
  while (num) {
    if (num < 1000) {
      str = num + ',' + str
      break
    }
    str = (num % 1000).toString().padStart(3, '0') + ',' + str
    num = Math.floor(num / 1000)
  }
  return str
}

/**
 * GPL计算公式
 * @param power 已经烧的power数
 */
export const calculateGPL = (power: number) => {
  return Math.floor(Math.pow((power || 0) / 1000, 0.5))
}

/**
 * GCL计算公式
 * @param gcl 当前gcl数量
 */
export const calculateGCL = (gcl: number) => {
  return Math.floor(Math.pow((gcl || 0) / 1000000, 1 / 2.4)) + 1
}

export const gent = (r: string) => {
  return [
    r + 'H',
    r + 'H2O',
    'X' + r + 'H2O',
    r + 'O',
    r + 'HO2',
    'X' + r + 'HO2',
  ]
}

/**
 * 计算两个字符串之间的最小距离
 */
export const minDistance = (s1: string, s2: string) => {
  const len1 = s1.length
  const len2 = s2.length
  const matrix = new Array(len1)

  for (let i = 0; i <= len1; i++) {
    matrix[i] = []
    for (let j = 0; j <= len2; j++) {
      if (i == 0) {
        matrix[i][j] = j
      } else if (j == 0) {
        matrix[i][j] = i
      } else {
        let cost = 0
        if (s1[i - 1] != s2[j - 1]) {
          cost = 1
        }
        const temp = matrix[i - 1][j - 1] + cost
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          temp,
        )
      }
    }
  }
  return matrix[len1][len2]
}

/**
 * 找到最接近的字符串
 */
export const findClosest = (str: string, arr: string[]) => {
  let min = Infinity
  let closest = ''
  for (const item of arr) {
    const dist = minDistance(str, item)
    if (dist < min) {
      min = dist
      closest = item
    }
  }
  return closest
}
