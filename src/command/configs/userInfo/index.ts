import { getApi } from '../../../api/core'
import { calculateGCL, calculateGPL } from '../../../utils/utils'
import { createCommanderConfig } from '../../types'

export const userInfoCommandConfig = createCommanderConfig({
  name: 'userInfo',
  desc: '查看用户信息',
  args: [
    {
      name: 'username',
      desc: '查看指定玩家的信息',
    },
  ] as const,
  async handler(args, _, log) {
    const [username] = args
    const api = getApi()

    if (!username) {
      const res = await api.getMyInfo()
      const gcl = calculateGCL(res.gcl)
      const gpl = calculateGPL(res.power)
      const info = `用户名: ${res.username}\n用户ID: ${res._id}\ngcl: ${gcl}\ngpl: ${gpl}\ncredits: ${res.money}`
      log(info, true)
      return
    }

    const res = await api.getUserInfoByUserName(username)
    const gcl = calculateGCL(res.user.gcl)
    const gpl = calculateGPL(res.user.power)
    const info = `用户名: ${res.user.username}\n用户ID: ${res.user._id}\ngcl: ${gcl}\ngpl: ${gpl}\n`
    log(info, true)
  },
})
