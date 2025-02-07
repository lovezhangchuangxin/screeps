import { ScreepsApi } from 'screeps-simple-api'
import * as vscode from 'vscode'
import { setApi } from '../../../api/core'
import { createCommanderConfig } from '../../types'

export const loginCommandConfig = createCommanderConfig({
  name: 'login',
  desc: '登录',
  opts: [
    {
      name: 'token',
      type: 'string',
      alias: ['t'],
      desc: 'Screeps token，默认从配置中获取，如果没有配置则需要手动输入',
    },
  ] as const,
  async handler(_, opts, log) {
    let { token } = opts
    if (!token) {
      const { token: token2 } = vscode.workspace.getConfiguration('screeps')
      if (!token2) {
        log('请先配置 Screeps 的 token 或者手动输入 token', true)
        return
      }
      token = token2
    }
    const api = new ScreepsApi({
      token,
    })
    setApi(api)
    let retry = 0
    let timerId = setInterval(() => {
      if (api.getToken()) {
        log('登录成功', true)
        clearInterval(timerId)
      } else {
        retry++
        if (retry > 10) {
          log('登录失败', true)
          clearInterval(timerId)
        }
      }
    }, 200)
  },
})
