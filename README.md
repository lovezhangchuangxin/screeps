# Screeps

这是一个在工作时也能摸鱼玩 Screeps 的 VSCode 插件。

之所以考虑使用 VSCode 插件的形式，一方面在 VSCode 玩 Screeps 不容易摸鱼时被老板发现，另一方面也是出于编写 VSCode 插件的学习。

我们并不提供类型 Screeps 官网的游戏界面，这没有必要。我们专注于在 VSCode 中模拟命令行的界面，让玩家输入命令操作游戏。

因此，玩家需要了解的是我们插件中自定义的各种命令，不必担心，使用`help`命令可以查看所有命令的帮助。

## 安装

在 VSCode 中搜索`Screeps`插件，点击安装即可。

## 使用

初次启动插件时，会提示在配置文件中配置 Screeps 的邮箱密码。为什么不是配置 token 呢？因为我们的插件依赖于 `screeps-simple-api` 这个库，它暂时只支持邮箱密码登录。

之所以不用 `screeps-api` 这个库是因为它没有实现 TypeScript 的类型提示。

配置好游戏密码后，我们可以使用`login`命令登录。（第一次需要使用`login`或者重启VSCode，之后插件会自动登录）

接下来，我们可以使用各种命令操作游戏。

## 功能

我们的功能是通过一个个命令提供的，通过`help [command]`命令可以查看某个命令的帮助。

| 命令       | 描述               |
| ---------- | ------------------ |
| `help`     | 查看命令的帮助信息 |
| `login`    | 登录到 Screeps     |
| `userInfo` | 查看用户信息       |
| `res`      | 查看资源信息       |

## 原理

我们通过 webview 的形式，模拟命令行的界面，让玩家输入命令操作游戏。

webview 和 vscode 之间的通信是通过`postMessage`和`onDidReceiveMessage`方法实现的。

**我们力图减小插件的体积，尽量不引入大体积的第三方库**。因此，我们没有使用诸如 React、Vue 这样的框架来实现 webview 的界面，而是使用原生的 HTML、CSS、JavaScript 实现了小巧的命令行界面。
