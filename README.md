# Screeps

这是一个在工作时也能摸鱼玩 Screeps 的 VSCode 插件。

之所以考虑使用 VSCode 插件的形式，一方面在 VSCode 玩 Screeps 不容易摸鱼时被老板发现，另一方面也是出于编写 VSCode 插件的学习。

我们并不提供类型 Screeps 官网的游戏界面，这没有必要。我们专注于在 VSCode 中模拟命令行的界面，让玩家输入命令操作游戏。

因此，玩家需要了解的是我们插件中自定义的各种命令，不必担心，使用`help`命令可以查看所有命令的帮助。

## 安装

在 VSCode 中搜索`Screeps`插件，点击安装即可。

## 使用

> 放心，本插件绝不会收集用户的邮箱和密码，配置只存在本地

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

## 开发

如果你想要为这个插件贡献代码，可以按照以下步骤进行：

1. 克隆本仓库

```bash
git clone git@github.com:lovezhangchuangxin/screeps.git
```

2. 安装依赖

```bash
pnpm install
```

3. 启动调试

在 VSCode 中按`F5`启动调试，这会打开一个新的 VSCode 窗口，里面有我们的插件。

4. 修改代码

在`src/command`目录下增加新的命令并导入，保存后会自动刷新插件。

5. 提交 PR

修改完成后，提交 PR 到本仓库，我们会尽快处理。

如果你想提前让别人体现你的功能，你可以先使用`vsce`命令打包插件，生成 `.vsix` 文件，然后分享给别人。

```bash
vsce package --no-dependencies
```
