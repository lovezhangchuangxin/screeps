import * as vscode from 'vscode'
import getWebviewContent from './getWebviewContent'
import ScreepsProgram from '../command'

export default class ScreepsTerminalViewProvider
  implements vscode.WebviewViewProvider
{
  public static readonly viewType = 'screeps-terminal'

  private _view?: vscode.WebviewView

  public program: ScreepsProgram = ScreepsProgram.getInstance()

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ) {
    this._view = webviewView

    webviewView.webview.options = {
      // 允许脚本在 Webview 中运行
      enableScripts: true,

      // 本地资源的根目录
      localResourceRoots: [this._extensionUri],
    }

    webviewView.webview.html = getWebviewContent()

    const log = (
      output: string,
      done = false,
      { type }: { type: 'pre' | 'custom' } = { type: 'pre' },
    ) => {
      if (type === 'pre') {
        output = `<pre style="margin: 0">${output}</pre>`
      }
      webviewView.webview.postMessage(JSON.stringify({ output, done }))
    }

    webviewView.webview.onDidReceiveMessage((message) => {
      try {
        const data = JSON.parse(message)
        const { command } = data
        this.program.exec(command, log)
      } catch (error) {}
    })
  }
}
