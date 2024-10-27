// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import ScreepsTerminalViewProvider from './view/screepsViewProvider'

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // register the screeps-terminal view
  const provider = new ScreepsTerminalViewProvider(context.extensionUri)
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      ScreepsTerminalViewProvider.viewType,
      provider,
    ),
  )
}

// This method is called when your extension is deactivated
export function deactivate() {}
