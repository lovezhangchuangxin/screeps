import { createCommanderConfig } from '../../types'
import { getApi } from '../../../api/core'
import { ResourceConstant, Shard } from 'screeps-simple-api'
import { splitNum } from '../../../utils/utils'
import {
  b_blueRes,
  b_greenRes,
  b_greyRes,
  b_pinkRes,
  b_witheRes,
  b_yellowRes,
  barsRes,
  baseRes,
  c_blueRes,
  c_greenRes,
  c_greyRes,
  c_pinkRes,
  c_yellowRes,
  powerRes,
  RES_COLOR_MAP,
} from '../../../utils/constants'
import { FakeCanvas } from '../../../utils/canvas'

export const resourceCommandConfig = createCommanderConfig({
  name: 'res',
  desc: '查看资源',
  args: [
    {
      name: 'username',
      desc: '查看指定玩家的资源',
    },
  ] as const,
  opts: [
    {
      name: 'shard',
      type: 'string',
      alias: ['s'],
      desc: '指定shard，默认为全部shard',
    },
  ] as const,
  async handler(args, opts, log) {
    const [username] = args
    const queryShard = opts.shard
    const api = getApi()
    if (queryShard && !queryShard.match(/^shard[0123]$/)) {
      log('请输入正确的shard名', true)
      return
    }
    // 查找该玩家id
    const userInfo = await api.getUserInfoByUserName(username)
    if (!userInfo.ok || !userInfo.user) {
      return log('未找到该玩家', true)
    }
    const roomsInfo = await api.getRooms(userInfo.user._id)
    if (!roomsInfo.ok) {
      return log('未找到该玩家房间信息', true)
    }
    log('正在查询...\n', false)
    const requests = []
    const resStats: {
      [key in ResourceConstant]?: number
    } = {}
    for (const shardName in roomsInfo.shards) {
      if (queryShard && shardName !== queryShard) continue
      const shard = shardName as Shard
      for (const room of roomsInfo.shards[shard]) {
        // 请求该房间对象
        requests.push(api.getRoomObject(room, shard))
      }
    }
    Promise.all(requests).then((responses) => {
      let success = true
      for (const res of responses) {
        if (!res.ok) {
          success = false
          return
        }
        for (const object of res.objects) {
          if (
            object.type !== 'storage' &&
            object.type !== 'terminal' &&
            object.type !== 'factory'
          )
            continue
          for (const resType in object.store) {
            const type = resType as ResourceConstant
            resStats[type] = (resStats[type] || 0) + object.store[type]
          }
        }
      }
      if (!success) return log('查询失败', true)

      // 绘图
      const gap = 100
      const width = 9 * gap + 50
      const height = 550
      const ctx = new FakeCanvas({
        width,
        height,
        backgroundColor: '#1B1E2B',
        fontSize: 14,
      })

      ctx.drawText('baseRes', 10, 15, '#fff')
      baseRes.forEach((type, index) => {
        ctx.drawText(
          `${type}\n${splitNum(resStats[type as ResourceConstant] || 0)}`,
          30 + index * gap,
          30,
          RES_COLOR_MAP[type],
        )
      })

      ctx.drawText('barsRes', 10, 65, '#fff')
      barsRes.forEach((type, index) => {
        ctx.drawText(
          `${type}\n${splitNum(resStats[type as ResourceConstant] || 0)}`,
          30 + index * gap,
          80,
          RES_COLOR_MAP[type],
        )
      })

      ctx.drawText('powerRes', 10, 115, '#fff')
      powerRes.forEach((type, index) => {
        ctx.drawText(
          `${type}\n${splitNum(resStats[type as ResourceConstant] || 0)}`,
          30 + index * gap,
          130,
          RES_COLOR_MAP[type],
        )
      })

      ctx.drawText('goods', 10, 165, '#fff')
      for (const [y, res] of [
        c_greyRes,
        c_blueRes,
        c_yellowRes,
        c_pinkRes,
        c_greenRes,
      ].entries()) {
        res.forEach((type, index) => {
          ctx.drawText(
            `${type}\n${splitNum(resStats[type as ResourceConstant] || 0)}`,
            30 + index * gap,
            180 + y * 30,
            RES_COLOR_MAP[type],
          )
        })
      }

      ctx.drawText('labRes', 10, 335, '#fff')
      for (const [y, res] of [
        b_greyRes,
        b_blueRes,
        b_yellowRes,
        b_pinkRes,
        b_greenRes,
        b_witheRes,
      ].entries()) {
        res.forEach((type, index) => {
          ctx.drawText(
            `${type}\n${splitNum(resStats[type as ResourceConstant] || 0)}`,
            30 + index * gap,
            350 + y * 30,
            RES_COLOR_MAP[type],
          )
        })
      }

      // 绘制玩家名和统计时间
      ctx.drawText(
        `${username} ${new Date().toLocaleString()}`,
        30 + 7 * gap,
        410,
        `#000`,
      )

      const img = ctx.render()
      log('查询成功\n', true)
      log(img, false)
    })
  },
})
