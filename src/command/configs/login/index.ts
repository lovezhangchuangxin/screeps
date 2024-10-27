import { ScreepsApi } from 'screeps-simple-api'
import * as vscode from 'vscode'
import { setApi } from '../../../api/core'
import { createCommanderConfig } from '../../types'

export const loginCommandConfig = createCommanderConfig({
  name: 'login',
  desc: '登录',
  args: [
    {
      name: 'email',
      desc: '用户名',
    },
    {
      name: 'password',
      desc: '密码',
    },
  ] as const,
  async handler(args, _, log) {
    let [email, password] = args
    if (!email || !password) {
      const { email2, password2 } = vscode.workspace.getConfiguration('screeps')
      if (!email2 || !password2) {
        log('请先配置Screeps的邮箱或密码', true)
        return
      }
      email = email || email2
      password = password || password2
    }
    const api = new ScreepsApi({
      // screeps官网注册的邮箱
      email,
      // screeps官网登录密码
      password,
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
