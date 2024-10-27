import * as vscode from 'vscode'
import { ScreepsApi } from 'screeps-simple-api'

const { email, password } = vscode.workspace.getConfiguration('screeps')
if (!email || !password) {
  vscode.window
    .showWarningMessage('请先配置Screeps的邮箱或密码', '立即配置')
    .then((selection) => {
      if (selection === '立即配置') {
        vscode.commands.executeCommand(
          'workbench.action.openSettings',
          'screeps',
        )
      }
    })
}

let _api: ScreepsApi = new ScreepsApi({
  // screeps官网注册的邮箱
  email,
  // screeps官网登录密码
  password,
})

export const getApi = () => {
  return _api
}

export const setApi = (api: ScreepsApi) => {
  _api = api
}

export const requireApiWarning = () => {
  if (!_api.getToken()) {
  }
}
