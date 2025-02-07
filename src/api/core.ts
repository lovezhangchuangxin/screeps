import * as vscode from 'vscode'
import { ScreepsApi } from 'screeps-simple-api'

const { token } = vscode.workspace.getConfiguration('screeps')
if (!token) {
  vscode.window
    .showWarningMessage('请先配置 Screeps 的 token', '立即配置')
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
  token,
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
