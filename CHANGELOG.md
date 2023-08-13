<a name="readme-top"></a>

# Changelog

### [Version 0.44.2](https://github.com/lobehub/lobe-chat/compare/v0.44.1...v0.44.2)

<sup>Released on **2023-08-13**</sup>

#### 🐛 Bug Fixes

- **misc**: 修正重新生成时切分历史消息的逻辑.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's fixed

- **misc**: 修正重新生成时切分历史消息的逻辑, closes [#50](https://github.com/lobehub/lobe-chat/issues/50) ([de5141f](https://github.com/lobehub/lobe-chat/commit/de5141f))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.44.1](https://github.com/lobehub/lobe-chat/compare/v0.44.0...v0.44.1)

<sup>Released on **2023-08-12**</sup>

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.44.0](https://github.com/lobehub/lobe-chat/compare/v0.43.0...v0.44.0)

<sup>Released on **2023-08-12**</sup>

#### ♻ Code Refactoring

- **misc**: 优化 Inbox 会话的实现逻辑, 将 chat 中的功能模型拆分到 features 中, 重构 session 相关实现，移除循环依赖.

#### ✨ Features

- **misc**: 支持 inbox 消息导出, 支持 inbox 的会话功能, 新增 inbox 数据模型, 新增 inbox 模块入口.

#### 💄 Styles

- **misc**: Fix Inbox defaultMessage avatar, 优化 header 的 setting 展示, 优化门禁下默认的解锁方式, 补充 ChatList 的 Loading 态.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Code refactoring

- **misc**: 优化 Inbox 会话的实现逻辑 ([22cc4cf](https://github.com/lobehub/lobe-chat/commit/22cc4cf))
- **misc**: 将 chat 中的功能模型拆分到 features 中 ([e25a856](https://github.com/lobehub/lobe-chat/commit/e25a856))
- **misc**: 重构 session 相关实现，移除循环依赖 ([9acf65c](https://github.com/lobehub/lobe-chat/commit/9acf65c))

#### What's improved

- **misc**: 支持 inbox 消息导出 ([498e075](https://github.com/lobehub/lobe-chat/commit/498e075))
- **misc**: 支持 inbox 的会话功能 ([9b713b8](https://github.com/lobehub/lobe-chat/commit/9b713b8))
- **misc**: 新增 inbox 数据模型 ([91a8158](https://github.com/lobehub/lobe-chat/commit/91a8158))
- **misc**: 新增 inbox 模块入口 ([6fc8907](https://github.com/lobehub/lobe-chat/commit/6fc8907))

#### Styles

- **misc**: Fix Inbox defaultMessage avatar ([dbc18a4](https://github.com/lobehub/lobe-chat/commit/dbc18a4))
- **misc**: 优化 header 的 setting 展示 ([201d380](https://github.com/lobehub/lobe-chat/commit/201d380))
- **misc**: 优化门禁下默认的解锁方式 ([df9bb45](https://github.com/lobehub/lobe-chat/commit/df9bb45))
- **misc**: 补充 ChatList 的 Loading 态 ([eb3eb5d](https://github.com/lobehub/lobe-chat/commit/eb3eb5d))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.43.0](https://github.com/lobehub/lobe-chat/compare/v0.42.3...v0.43.0)

<sup>Released on **2023-08-12**</sup>

#### ✨ Features

- **misc**: 支持切换语言.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: 支持切换语言, closes [#67](https://github.com/lobehub/lobe-chat/issues/67) ([63ed8ec](https://github.com/lobehub/lobe-chat/commit/63ed8ec))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.42.3](https://github.com/lobehub/lobe-chat/compare/v0.42.2...v0.42.3)

<sup>Released on **2023-08-12**</sup>

#### 💄 Styles

- **misc**: 暂时隐藏 Hero 模板.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Styles

- **misc**: 暂时隐藏 Hero 模板 ([8289ae6](https://github.com/lobehub/lobe-chat/commit/8289ae6))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.42.2](https://github.com/lobehub/lobe-chat/compare/v0.42.1...v0.42.2)

<sup>Released on **2023-08-12**</sup>

#### ♻ Code Refactoring

- **misc**: 将 useSettings 更名为 useGlobalStore, 将原本的 settings 更名为 global, 收敛切换 SideBar 方法为 useSwitchSideBarOnInit, 重构需本地缓存的状态为 preference.

#### 🐛 Bug Fixes

- **misc**: 修正移除 session 时的路由跳转逻辑.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Code refactoring

- **misc**: 将 useSettings 更名为 useGlobalStore ([bdde7df](https://github.com/lobehub/lobe-chat/commit/bdde7df))
- **misc**: 将原本的 settings 更名为 global ([e42d34c](https://github.com/lobehub/lobe-chat/commit/e42d34c))
- **misc**: 收敛切换 SideBar 方法为 useSwitchSideBarOnInit ([bbad38f](https://github.com/lobehub/lobe-chat/commit/bbad38f))
- **misc**: 重构需本地缓存的状态为 preference ([8359b62](https://github.com/lobehub/lobe-chat/commit/8359b62))

#### What's fixed

- **misc**: 修正移除 session 时的路由跳转逻辑 ([8b7838d](https://github.com/lobehub/lobe-chat/commit/8b7838d))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.42.1](https://github.com/lobehub/lobe-chat/compare/v0.42.0...v0.42.1)

<sup>Released on **2023-08-12**</sup>

#### 💄 Styles

- **misc**: 优化 App 首页 Loading 态.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Styles

- **misc**: 优化 App 首页 Loading 态 ([72104e8](https://github.com/lobehub/lobe-chat/commit/72104e8))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.42.0](https://github.com/lobehub/lobe-chat/compare/v0.41.2...v0.42.0)

<sup>Released on **2023-08-11**</sup>

#### ✨ Features

- **misc**: Add `Welcome` page.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: Add `Welcome` page, closes [#60](https://github.com/lobehub/lobe-chat/issues/60) ([810ab0f](https://github.com/lobehub/lobe-chat/commit/810ab0f))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.41.2](https://github.com/lobehub/lobe-chat/compare/v0.41.1...v0.41.2)

<sup>Released on **2023-08-10**</sup>

#### ♻ Code Refactoring

- **misc**: 将 sessionStore 默认 equalFn 改为 shallow, 将 settingStore 默认 equalFn 改为 shallow.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Code refactoring

- **misc**: 将 sessionStore 默认 equalFn 改为 shallow ([5c1b8d7](https://github.com/lobehub/lobe-chat/commit/5c1b8d7))
- **misc**: 将 settingStore 默认 equalFn 改为 shallow ([1e72308](https://github.com/lobehub/lobe-chat/commit/1e72308))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.41.1](https://github.com/lobehub/lobe-chat/compare/v0.41.0...v0.41.1)

<sup>Released on **2023-08-10**</sup>

#### ♻ Code Refactoring

- **misc**: 重构 settings store 代码写法.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Code refactoring

- **misc**: 重构 settings store 代码写法 ([4b6f917](https://github.com/lobehub/lobe-chat/commit/4b6f917))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.41.0](https://github.com/lobehub/lobe-chat/compare/v0.40.7...v0.41.0)

<sup>Released on **2023-08-10**</sup>

#### ✨ Features

- **misc**: 支持持久化隐藏 Topic 功能.

#### 💄 Styles

- **misc**: 优化第一次水合逻辑.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: 支持持久化隐藏 Topic 功能 ([9ea2778](https://github.com/lobehub/lobe-chat/commit/9ea2778))

#### Styles

- **misc**: 优化第一次水合逻辑 ([fefae61](https://github.com/lobehub/lobe-chat/commit/fefae61))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.40.7](https://github.com/lobehub/lobe-chat/compare/v0.40.6...v0.40.7)

<sup>Released on **2023-08-10**</sup>

#### 💄 Styles

- **misc**: 优化 Topic 的水合加载效果.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Styles

- **misc**: 优化 Topic 的水合加载效果 ([0cd0088](https://github.com/lobehub/lobe-chat/commit/0cd0088))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.40.6](https://github.com/lobehub/lobe-chat/compare/v0.40.5...v0.40.6)

<sup>Released on **2023-08-10**</sup>

#### ♻ Code Refactoring

- **misc**: 重构优化 hydrated 的判断逻辑.

#### 💄 Styles

- **misc**: 优化水合前的加载效果.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Code refactoring

- **misc**: 重构优化 hydrated 的判断逻辑 ([1781119](https://github.com/lobehub/lobe-chat/commit/1781119))

#### Styles

- **misc**: 优化水合前的加载效果 ([6bbd978](https://github.com/lobehub/lobe-chat/commit/6bbd978))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.40.5](https://github.com/lobehub/lobe-chat/compare/v0.40.4...v0.40.5)

<sup>Released on **2023-08-10**</sup>

#### 💄 Styles

- **misc**: 增加未初始化的 loading 态.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Styles

- **misc**: 增加未初始化的 loading 态 ([dcb7c07](https://github.com/lobehub/lobe-chat/commit/dcb7c07))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.40.4](https://github.com/lobehub/lobe-chat/compare/v0.40.3...v0.40.4)

<sup>Released on **2023-08-10**</sup>

#### 💄 Styles

- **misc**: 优化 Header 样式.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Styles

- **misc**: 优化 Header 样式 ([edd148a](https://github.com/lobehub/lobe-chat/commit/edd148a))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.40.3](https://github.com/lobehub/lobe-chat/compare/v0.40.2...v0.40.3)

<sup>Released on **2023-08-10**</sup>

#### 🐛 Bug Fixes

- **misc**: 修正没有 prompt 的编辑与保存按钮的问题.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's fixed

- **misc**: 修正没有 prompt 的编辑与保存按钮的问题 ([b7e1648](https://github.com/lobehub/lobe-chat/commit/b7e1648))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.40.2](https://github.com/lobehub/lobe-chat/compare/v0.40.1...v0.40.2)

<sup>Released on **2023-08-08**</sup>

#### 🐛 Bug Fixes

- **misc**: 修正 defaults 造成的 config 报错.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's fixed

- **misc**: 修正 defaults 造成的 config 报错 ([0857fa7](https://github.com/lobehub/lobe-chat/commit/0857fa7))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.40.1](https://github.com/lobehub/lobe-chat/compare/v0.40.0...v0.40.1)

<sup>Released on **2023-08-06**</sup>

#### 🐛 Bug Fixes

- **misc**: 优化 openai 接口的错误处理逻辑.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's fixed

- **misc**: 优化 openai 接口的错误处理逻辑 ([eae78fe](https://github.com/lobehub/lobe-chat/commit/eae78fe))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.40.0](https://github.com/lobehub/lobe-chat/compare/v0.39.4...v0.40.0)

<sup>Released on **2023-08-05**</sup>

#### ✨ Features

- **misc**: Add new dependency, add Tag and PluginTag components, update HeaderTitle.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: Add new dependency, add Tag and PluginTag components, update HeaderTitle, closes [#56](https://github.com/lobehub/lobe-chat/issues/56) [#55](https://github.com/lobehub/lobe-chat/issues/55) [#54](https://github.com/lobehub/lobe-chat/issues/54) ([2812ea2](https://github.com/lobehub/lobe-chat/commit/2812ea2))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.39.4](https://github.com/lobehub/lobe-chat/compare/v0.39.3...v0.39.4)

<sup>Released on **2023-08-05**</sup>

#### 💄 Styles

- **misc**: 修正 assistant 消息没有 background 的问题.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Styles

- **misc**: 修正 assistant 消息没有 background 的问题, closes [#42](https://github.com/lobehub/lobe-chat/issues/42) ([812e976](https://github.com/lobehub/lobe-chat/commit/812e976))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.39.3](https://github.com/lobehub/lobe-chat/compare/v0.39.2...v0.39.3)

<sup>Released on **2023-08-04**</sup>

#### 🐛 Bug Fixes

- **misc**: 优化 405 报错返回内容，并优化 openai 服务端超时处理逻辑.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's fixed

- **misc**: 优化 405 报错返回内容，并优化 openai 服务端超时处理逻辑 ([0acc829](https://github.com/lobehub/lobe-chat/commit/0acc829))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.39.2](https://github.com/lobehub/lobe-chat/compare/v0.39.1...v0.39.2)

<sup>Released on **2023-08-04**</sup>

#### 💄 Styles

- **misc**: 优化 topic 样式.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Styles

- **misc**: 优化 topic 样式 ([75dc034](https://github.com/lobehub/lobe-chat/commit/75dc034))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.39.1](https://github.com/lobehub/lobe-chat/compare/v0.39.0...v0.39.1)

<sup>Released on **2023-08-04**</sup>

#### 🐛 Bug Fixes

- **misc**: 修正 basePath 在生产环境下不生效的问题.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's fixed

- **misc**: 修正 basePath 在生产环境下不生效的问题 ([71b9139](https://github.com/lobehub/lobe-chat/commit/71b9139))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.39.0](https://github.com/lobehub/lobe-chat/compare/v0.38.0...v0.39.0)

<sup>Released on **2023-08-04**</sup>

#### ✨ Features

- **misc**: 支持多轮的插件意图识别, 支持自定义 OpenAI 代理地址.

#### 💄 Styles

- **misc**: 优化插件的展示逻辑.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: 支持多轮的插件意图识别 ([5127f1b](https://github.com/lobehub/lobe-chat/commit/5127f1b))
- **misc**: 支持自定义 OpenAI 代理地址 ([33a111c](https://github.com/lobehub/lobe-chat/commit/33a111c))

#### Styles

- **misc**: 优化插件的展示逻辑 ([7621bad](https://github.com/lobehub/lobe-chat/commit/7621bad))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.38.0](https://github.com/lobehub/lobe-chat/compare/v0.37.0...v0.38.0)

<sup>Released on **2023-08-04**</sup>

#### ✨ Features

- **misc**: Add topic empty.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: Add topic empty ([b9f267c](https://github.com/lobehub/lobe-chat/commit/b9f267c))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.37.0](https://github.com/lobehub/lobe-chat/compare/v0.36.1...v0.37.0)

<sup>Released on **2023-08-03**</sup>

#### ✨ Features

- **misc**: 支持使用全局助手的设置作为默认助手的创建角色.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: 支持使用全局助手的设置作为默认助手的创建角色, closes [#44](https://github.com/lobehub/lobe-chat/issues/44) ([f91857d](https://github.com/lobehub/lobe-chat/commit/f91857d))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.36.1](https://github.com/lobehub/lobe-chat/compare/v0.36.0...v0.36.1)

<sup>Released on **2023-08-03**</sup>

#### ♻ Code Refactoring

- **misc**: Refactor zustand usage with v4.4.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Code refactoring

- **misc**: Refactor zustand usage with v4.4, closes [#52](https://github.com/lobehub/lobe-chat/issues/52) ([4c65aa7](https://github.com/lobehub/lobe-chat/commit/4c65aa7))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.36.0](https://github.com/lobehub/lobe-chat/compare/v0.35.1...v0.36.0)

<sup>Released on **2023-08-03**</sup>

#### ✨ Features

- **misc**: 实现自定义历史消息数功能.

#### 🐛 Bug Fixes

- **misc**: Fix setting type.

#### 💄 Styles

- **misc**: Fix session item height.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: 实现自定义历史消息数功能 ([7baa022](https://github.com/lobehub/lobe-chat/commit/7baa022))

#### What's fixed

- **misc**: Fix setting type ([57e415e](https://github.com/lobehub/lobe-chat/commit/57e415e))

#### Styles

- **misc**: Fix session item height ([6cd1de5](https://github.com/lobehub/lobe-chat/commit/6cd1de5))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.35.1](https://github.com/lobehub/lobe-chat/compare/v0.35.0...v0.35.1)

<sup>Released on **2023-07-31**</sup>

#### 💄 Styles

- **misc**: Update doc mode and token tags.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Styles

- **misc**: Update doc mode and token tags ([1d3c5b6](https://github.com/lobehub/lobe-chat/commit/1d3c5b6))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.35.0](https://github.com/lobehub/lobe-chat/compare/v0.34.0...v0.35.0)

<sup>Released on **2023-07-31**</sup>

#### ✨ Features

- **misc**: Add agent settings functionality, new components, and features for AgentMeta, Add and modify translations for various keys in JSON code files.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: Add agent settings functionality, new components, and features for AgentMeta ([b1e5ff9](https://github.com/lobehub/lobe-chat/commit/b1e5ff9))
- **misc**: Add and modify translations for various keys in JSON code files ([503adb4](https://github.com/lobehub/lobe-chat/commit/503adb4))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.34.0](https://github.com/lobehub/lobe-chat/compare/v0.33.0...v0.34.0)

<sup>Released on **2023-07-31**</sup>

#### ✨ Features

- **misc**: Add agent settings functionality, Add new components and features for AgentMeta, Improve organization and functionality of settings and configuration features.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: Add agent settings functionality ([b0aaeed](https://github.com/lobehub/lobe-chat/commit/b0aaeed))
- **misc**: Add new components and features for AgentMeta ([1232d95](https://github.com/lobehub/lobe-chat/commit/1232d95))
- **misc**: Improve organization and functionality of settings and configuration features ([badde35](https://github.com/lobehub/lobe-chat/commit/badde35))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.33.0](https://github.com/lobehub/lobe-chat/compare/v0.32.0...v0.33.0)

<sup>Released on **2023-07-30**</sup>

#### ✨ Features

- **misc**: 支持输入模板预处理.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: 支持输入模板预处理 ([84082c1](https://github.com/lobehub/lobe-chat/commit/84082c1))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.32.0](https://github.com/lobehub/lobe-chat/compare/v0.31.0...v0.32.0)

<sup>Released on **2023-07-30**</sup>

#### ✨ Features

- **misc**: 支持会话置顶.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: 支持会话置顶, closes [#32](https://github.com/lobehub/lobe-chat/issues/32) ([fc44b5d](https://github.com/lobehub/lobe-chat/commit/fc44b5d))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.31.0](https://github.com/lobehub/lobe-chat/compare/v0.30.1...v0.31.0)

<sup>Released on **2023-07-30**</sup>

#### ✨ Features

- **misc**: 支持展示 token 使用量.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: 支持展示 token 使用量, closes [#31](https://github.com/lobehub/lobe-chat/issues/31) ([e4d4dac](https://github.com/lobehub/lobe-chat/commit/e4d4dac))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.30.1](https://github.com/lobehub/lobe-chat/compare/v0.30.0...v0.30.1)

<sup>Released on **2023-07-30**</sup>

#### 💄 Styles

- **misc**: 优化搜索引擎插件展示.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Styles

- **misc**: 优化搜索引擎插件展示 ([347e6b0](https://github.com/lobehub/lobe-chat/commit/347e6b0))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.30.0](https://github.com/lobehub/lobe-chat/compare/v0.29.0...v0.30.0)

<sup>Released on **2023-07-30**</sup>

#### ✨ Features

- **misc**: 优化保存为话题功能, 实现 Topic 重命名功能, 实现话题删除功能, 支持缓存角色面板的展开折叠状态.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: 优化保存为话题功能 ([fdbe084](https://github.com/lobehub/lobe-chat/commit/fdbe084))
- **misc**: 实现 Topic 重命名功能 ([5ef1685](https://github.com/lobehub/lobe-chat/commit/5ef1685))
- **misc**: 实现话题删除功能 ([970889d](https://github.com/lobehub/lobe-chat/commit/970889d))
- **misc**: 支持缓存角色面板的展开折叠状态 ([c241c4b](https://github.com/lobehub/lobe-chat/commit/c241c4b))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.29.0](https://github.com/lobehub/lobe-chat/compare/v0.28.0...v0.29.0)

<sup>Released on **2023-07-30**</sup>

#### ✨ Features

- **misc**: 实现单个会话和角色的导出功能, 实现清空所有会话消息.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: 实现单个会话和角色的导出功能 ([d15a481](https://github.com/lobehub/lobe-chat/commit/d15a481))
- **misc**: 实现清空所有会话消息 ([64c5125](https://github.com/lobehub/lobe-chat/commit/64c5125))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.28.0](https://github.com/lobehub/lobe-chat/compare/v0.27.4...v0.28.0)

<sup>Released on **2023-07-30**</sup>

#### ♻ Code Refactoring

- **misc**: 重构 settings 相关类型.

#### ✨ Features

- **misc**: 优化 SideBar 实现，激活态指示更加明确, 实现 session 导入功能, 实现配置导出功能.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Code refactoring

- **misc**: 重构 settings 相关类型 ([6b7c0a0](https://github.com/lobehub/lobe-chat/commit/6b7c0a0))

#### What's improved

- **misc**: 优化 SideBar 实现，激活态指示更加明确 ([8a467df](https://github.com/lobehub/lobe-chat/commit/8a467df))
- **misc**: 实现 session 导入功能 ([5650167](https://github.com/lobehub/lobe-chat/commit/5650167))
- **misc**: 实现配置导出功能 ([c1f73fe](https://github.com/lobehub/lobe-chat/commit/c1f73fe))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.27.4](https://github.com/lobehub/lobe-chat/compare/v0.27.3...v0.27.4)

<sup>Released on **2023-07-29**</sup>

#### 🐛 Bug Fixes

- **misc**: 修正日志超过 4096 长度的问题.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's fixed

- **misc**: 修正日志超过 4096 长度的问题 ([6066aff](https://github.com/lobehub/lobe-chat/commit/6066aff))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.27.3](https://github.com/lobehub/lobe-chat/compare/v0.27.2...v0.27.3)

<sup>Released on **2023-07-29**</sup>

#### 🐛 Bug Fixes

- **misc**: 修正返回结果导致插件无法正常识别的问题.

#### 💄 Styles

- **misc**: 优化样式.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's fixed

- **misc**: 修正返回结果导致插件无法正常识别的问题 ([b183188](https://github.com/lobehub/lobe-chat/commit/b183188))

#### Styles

- **misc**: 优化样式 ([9ce5d1d](https://github.com/lobehub/lobe-chat/commit/9ce5d1d))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.27.2](https://github.com/lobehub/lobe-chat/compare/v0.27.1...v0.27.2)

<sup>Released on **2023-07-29**</sup>

#### ♻ Code Refactoring

- **misc**: 重构并优化文档抓取插件能力.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Code refactoring

- **misc**: 重构并优化文档抓取插件能力 ([ff56348](https://github.com/lobehub/lobe-chat/commit/ff56348))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.27.1](https://github.com/lobehub/lobe-chat/compare/v0.27.0...v0.27.1)

<sup>Released on **2023-07-29**</sup>

#### 💄 Styles

- **misc**: 优化搜索引擎样式.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Styles

- **misc**: 优化搜索引擎样式 ([699afb3](https://github.com/lobehub/lobe-chat/commit/699afb3))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.27.0](https://github.com/lobehub/lobe-chat/compare/v0.26.1...v0.27.0)

<sup>Released on **2023-07-29**</sup>

#### ✨ Features

- **misc**: 优化搜索引擎插件交互展示.

#### 💄 Styles

- **misc**: 优化兜底结果展示.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: 优化搜索引擎插件交互展示 ([4751084](https://github.com/lobehub/lobe-chat/commit/4751084))

#### Styles

- **misc**: 优化兜底结果展示 ([9da45d6](https://github.com/lobehub/lobe-chat/commit/9da45d6))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.26.1](https://github.com/lobehub/lobe-chat/compare/v0.26.0...v0.26.1)

<sup>Released on **2023-07-29**</sup>

#### ♻ Code Refactoring

- **misc**: 优化 setting Layout 实现.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Code refactoring

- **misc**: 优化 setting Layout 实现 ([f789935](https://github.com/lobehub/lobe-chat/commit/f789935))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.26.0](https://github.com/lobehub/lobe-chat/compare/v0.25.0...v0.26.0)

<sup>Released on **2023-07-28**</sup>

#### ✨ Features

- **misc**: support password auth and error.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: support password auth and error, closes [#22](https://github.com/lobehub/lobe-chat/issues/22) ([67f1f4d](https://github.com/lobehub/lobe-chat/commit/67f1f4d))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.25.0](https://github.com/lobehub/lobe-chat/compare/v0.24.0...v0.25.0)

<sup>Released on **2023-07-26**</sup>

#### ✨ Features

- **sidebar**: Add import functionality and set labels and onClick functions

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### ✨ Features

- **sidebar**: Add import functionality and set labels and onClick functions ([03ea9bd](https://github.com/lobehub/lobe-chat/commit/03ea9bd))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.24.0](https://github.com/lobehub/lobe-chat/compare/v0.23.0...v0.24.0)

<sup>Released on **2023-07-26**</sup>

#### ✨ Features

- **misc**: Add new translations, update existing translations, add functionality to components, modify styling, and adjust placeholder text

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### ✨ Features

- Add new translations, update existing translations, add functionality to components, modify styling, and adjust placeholder text ([da4ae72](https://github.com/lobehub/lobe-chat/commit/da4ae72))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.23.0](https://github.com/lobehub/lobe-chat/compare/v0.22.2...v0.23.0)

<sup>Released on **2023-07-26**</sup>

#### ✨ Features

- **misc**: Add new features, update URLs, customize appearance, and implement components

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### ✨ Features

- Add new features, update URLs, customize appearance, and implement components ([4b61bf4](https://github.com/lobehub/lobe-chat/commit/4b61bf4))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.22.2](https://github.com/lobehub/lobe-chat/compare/v0.22.1...v0.22.2)

<sup>Released on **2023-07-26**</sup>

#### 💄 Styles

- **misc**: 优化 tooltip 显示.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Styles

- **misc**: 优化 tooltip 显示 ([4ba0295](https://github.com/lobehub/lobe-chat/commit/4ba0295))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.22.1](https://github.com/lobehub/lobe-chat/compare/v0.22.0...v0.22.1)

<sup>Released on **2023-07-25**</sup>

#### 🐛 Bug Fixes

- **misc**: 修正自定义 OpenAI API Key 的使用问题.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's fixed

- **misc**: 修正自定义 OpenAI API Key 的使用问题 ([84475c0](https://github.com/lobehub/lobe-chat/commit/84475c0))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.22.0](https://github.com/lobehub/lobe-chat/compare/v0.21.0...v0.22.0)

<sup>Released on **2023-07-25**</sup>

#### ✨ Features

- **misc**: 支持使用自定义 OpenAI Key.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: 支持使用自定义 OpenAI Key, closes [#20](https://github.com/lobehub/lobe-chat/issues/20) ([fb454a0](https://github.com/lobehub/lobe-chat/commit/fb454a0))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.21.0](https://github.com/lobehub/lobe-chat/compare/v0.20.0...v0.21.0)

<sup>Released on **2023-07-25**</sup>

#### ♻ Code Refactoring

- **misc**: Move component folder.

#### ✨ Features

- **misc**: 支持快捷配置模型、温度.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Code refactoring

- **misc**: Move component folder ([fb85d16](https://github.com/lobehub/lobe-chat/commit/fb85d16))

#### What's improved

- **misc**: 支持快捷配置模型、温度, closes [#19](https://github.com/lobehub/lobe-chat/issues/19) ([31daee1](https://github.com/lobehub/lobe-chat/commit/31daee1))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.20.0](https://github.com/lobehub/lobe-chat/compare/v0.19.0...v0.20.0)

<sup>Released on **2023-07-25**</sup>

#### ✨ Features

- **misc**: 实现话题模块.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: 实现话题模块, closes [#16](https://github.com/lobehub/lobe-chat/issues/16) ([64fd6ee](https://github.com/lobehub/lobe-chat/commit/64fd6ee))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.19.0](https://github.com/lobehub/lobe-chat/compare/v0.18.2...v0.19.0)

<sup>Released on **2023-07-24**</sup>

#### ♻ Code Refactoring

- **misc**: 将 message reducer 提取到独立文件夹中, 清理无用代码实现.

#### ✨ Features

- **misc**: 数据结构层完成 topic 模型改造.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Code refactoring

- **misc**: 将 message reducer 提取到独立文件夹中 ([64f40ca](https://github.com/lobehub/lobe-chat/commit/64f40ca))
- **misc**: 清理无用代码实现 ([3655b60](https://github.com/lobehub/lobe-chat/commit/3655b60))

#### What's improved

- **misc**: 数据结构层完成 topic 模型改造 ([99fa2a6](https://github.com/lobehub/lobe-chat/commit/99fa2a6))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.18.2](https://github.com/lobehub/lobe-chat/compare/v0.18.1...v0.18.2)

<sup>Released on **2023-07-24**</sup>

#### 💄 Styles

- **misc**: 修正 markdown li 丢失的问题.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Styles

- **misc**: 修正 markdown li 丢失的问题 ([eb6e831](https://github.com/lobehub/lobe-chat/commit/eb6e831))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.18.1](https://github.com/lobehub/lobe-chat/compare/v0.18.0...v0.18.1)

<sup>Released on **2023-07-24**</sup>

#### ♻ Code Refactoring

- **misc**: 优化新会话的创建逻辑 session.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Code refactoring

- **misc**: 优化新会话的创建逻辑 session ([d70f22d](https://github.com/lobehub/lobe-chat/commit/d70f22d))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.18.0](https://github.com/lobehub/lobe-chat/compare/v0.17.0...v0.18.0)

<sup>Released on **2023-07-24**</sup>

#### ✨ Features

- **misc**: 实现会话展示模式切换，并优化默认创建角色的配置.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: 实现会话展示模式切换，并优化默认创建角色的配置 ([27ae82f](https://github.com/lobehub/lobe-chat/commit/27ae82f))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.17.0](https://github.com/lobehub/lobe-chat/compare/v0.16.1...v0.17.0)

<sup>Released on **2023-07-24**</sup>

#### ✨ Features

- **misc**: 表单配置支持设定各项高级参数.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: 表单配置支持设定各项高级参数 ([6949cc6](https://github.com/lobehub/lobe-chat/commit/6949cc6))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.16.1](https://github.com/lobehub/lobe-chat/compare/v0.16.0...v0.16.1)

<sup>Released on **2023-07-24**</sup>

#### ♻ Code Refactoring

- **misc**: 重构优化 selectors 实现.

#### 💄 Styles

- **misc**: 优化 document title.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Code refactoring

- **misc**: 重构优化 selectors 实现 ([97fe1cd](https://github.com/lobehub/lobe-chat/commit/97fe1cd))

#### Styles

- **misc**: 优化 document title ([c3cda00](https://github.com/lobehub/lobe-chat/commit/c3cda00))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.16.0](https://github.com/lobehub/lobe-chat/compare/v0.15.1...v0.16.0)

<sup>Released on **2023-07-24**</sup>

#### ✨ Features

- **misc**: 支持自动跳转到第一条会话.

#### 💄 Styles

- **misc**: 修正插件的展示文案.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: 支持自动跳转到第一条会话 ([54f01c7](https://github.com/lobehub/lobe-chat/commit/54f01c7))

#### Styles

- **misc**: 修正插件的展示文案 ([53c81ae](https://github.com/lobehub/lobe-chat/commit/53c81ae))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.15.1](https://github.com/lobehub/lobe-chat/compare/v0.15.0...v0.15.1)

<sup>Released on **2023-07-24**</sup>

#### 💄 Styles

- **misc**: 更新插件文案.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Styles

- **misc**: 更新插件文案 ([0411335](https://github.com/lobehub/lobe-chat/commit/0411335))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.15.0](https://github.com/lobehub/lobe-chat/compare/v0.14.0...v0.15.0)

<sup>Released on **2023-07-24**</sup>

#### ✨ Features

- **misc**: Add new features and improve user experience, Import and use constants from "meta.ts" instead of "agentConfig".

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: Add new features and improve user experience ([64c8782](https://github.com/lobehub/lobe-chat/commit/64c8782))
- **misc**: Import and use constants from "meta.ts" instead of "agentConfig" ([1eb6a17](https://github.com/lobehub/lobe-chat/commit/1eb6a17))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.14.0](https://github.com/lobehub/lobe-chat/compare/v0.13.1...v0.14.0)

<sup>Released on **2023-07-24**</sup>

#### ✨ Features

- **misc**: 支持网页抓取.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: 支持网页抓取, closes [#14](https://github.com/lobehub/lobe-chat/issues/14) ([9e933b0](https://github.com/lobehub/lobe-chat/commit/9e933b0))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.13.1](https://github.com/lobehub/lobe-chat/compare/v0.13.0...v0.13.1)

<sup>Released on **2023-07-23**</sup>

#### 🐛 Bug Fixes

- **misc**: 修正搜索引擎插件的实现问题.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's fixed

- **misc**: 修正搜索引擎插件的实现问题 ([d19a805](https://github.com/lobehub/lobe-chat/commit/d19a805))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.13.0](https://github.com/lobehub/lobe-chat/compare/v0.12.1...v0.13.0)

<sup>Released on **2023-07-23**</sup>

#### ✨ Features

- **misc**: 优化插件模式下的用户体验.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: 优化插件模式下的用户体验, closes [#13](https://github.com/lobehub/lobe-chat/issues/13) ([4596f12](https://github.com/lobehub/lobe-chat/commit/4596f12))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.12.1](https://github.com/lobehub/lobe-chat/compare/v0.12.0...v0.12.1)

<sup>Released on **2023-07-23**</sup>

#### 🐛 Bug Fixes

- **misc**: 修正 message parentId 不正确的问题.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's fixed

- **misc**: 修正 message parentId 不正确的问题 ([f86852a](https://github.com/lobehub/lobe-chat/commit/f86852a))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.12.0](https://github.com/lobehub/lobe-chat/compare/v0.11.0...v0.12.0)

<sup>Released on **2023-07-23**</sup>

#### ✨ Features

- **misc**: 支持插件列表 与 基于 Serpapi 的搜索引擎插件.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: 支持插件列表 与 基于 Serpapi 的搜索引擎插件, closes [#12](https://github.com/lobehub/lobe-chat/issues/12) ([d89e06f](https://github.com/lobehub/lobe-chat/commit/d89e06f))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.11.0](https://github.com/lobehub/lobe-chat/compare/v0.10.2...v0.11.0)

<sup>Released on **2023-07-23**</sup>

#### ♻ Code Refactoring

- **misc**: Remove langchain, 优化代码.

#### ✨ Features

- **misc**: 支持查询天气.

#### 💄 Styles

- **misc**: Update manifest, 增加国际化文案.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Code refactoring

- **misc**: Remove langchain ([7b0f96c](https://github.com/lobehub/lobe-chat/commit/7b0f96c))
- **misc**: 优化代码 ([6a8f7df](https://github.com/lobehub/lobe-chat/commit/6a8f7df))

#### What's improved

- **misc**: 支持查询天气 ([34bf285](https://github.com/lobehub/lobe-chat/commit/34bf285))

#### Styles

- **misc**: Update manifest ([ea9e8de](https://github.com/lobehub/lobe-chat/commit/ea9e8de))
- **misc**: 增加国际化文案 ([f5e8d7c](https://github.com/lobehub/lobe-chat/commit/f5e8d7c))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.10.2](https://github.com/lobehub/lobe-chat/compare/v0.10.1...v0.10.2)

<sup>Released on **2023-07-23**</sup>

#### 💄 Styles

- **misc**: 优化模型在 list 中的展示逻辑.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Styles

- **misc**: 优化模型在 list 中的展示逻辑 ([4bdf3c5](https://github.com/lobehub/lobe-chat/commit/4bdf3c5))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.10.1](https://github.com/lobehub/lobe-chat/compare/v0.10.0...v0.10.1)

<sup>Released on **2023-07-22**</sup>

#### 💄 Styles

- **misc**: 修正对话中用户头像的问题.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Styles

- **misc**: 修正对话中用户头像的问题 ([560c8bb](https://github.com/lobehub/lobe-chat/commit/560c8bb))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.10.0](https://github.com/lobehub/lobe-chat/compare/v0.9.0...v0.10.0)

<sup>Released on **2023-07-22**</sup>

#### ✨ Features

- **misc**: 支持复制与编辑会话消息.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: 支持复制与编辑会话消息 ([bebcf9f](https://github.com/lobehub/lobe-chat/commit/bebcf9f))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.9.0](https://github.com/lobehub/lobe-chat/compare/v0.8.2...v0.9.0)

<sup>Released on **2023-07-22**</sup>

#### ✨ Features

- **misc**: 展示模型类型.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: 展示模型类型 ([58ea93c](https://github.com/lobehub/lobe-chat/commit/58ea93c))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.8.2](https://github.com/lobehub/lobe-chat/compare/v0.8.1...v0.8.2)

<sup>Released on **2023-07-22**</sup>

#### 🐛 Bug Fixes

- **misc**: Fix miss manifest.json link, 优化 model tag 展示逻辑.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's fixed

- **misc**: Fix miss manifest.json link ([ac4b2f3](https://github.com/lobehub/lobe-chat/commit/ac4b2f3))
- **misc**: 优化 model tag 展示逻辑 ([3463ede](https://github.com/lobehub/lobe-chat/commit/3463ede))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.8.1](https://github.com/lobehub/lobe-chat/compare/v0.8.0...v0.8.1)

<sup>Released on **2023-07-22**</sup>

#### 🐛 Bug Fixes

- **misc**: Fix import.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's fixed

- **misc**: Fix import ([4fb9967](https://github.com/lobehub/lobe-chat/commit/4fb9967))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.8.0](https://github.com/lobehub/lobe-chat/compare/v0.7.0...v0.8.0)

<sup>Released on **2023-07-22**</sup>

#### ✨ Features

- **misc**: 支持 pwa 模式.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: 支持 pwa 模式 ([8aad92d](https://github.com/lobehub/lobe-chat/commit/8aad92d))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.7.0](https://github.com/lobehub/lobe-chat/compare/v0.6.1...v0.7.0)

<sup>Released on **2023-07-22**</sup>

#### ✨ Features

- **misc**: 支持展示来自模型的标记信息.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: 支持展示来自模型的标记信息 ([e27fae9](https://github.com/lobehub/lobe-chat/commit/e27fae9))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.6.1](https://github.com/lobehub/lobe-chat/compare/v0.6.0...v0.6.1)

<sup>Released on **2023-07-22**</sup>

#### 🐛 Bug Fixes

- **misc**: Add deps.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's fixed

- **misc**: Add deps ([3dc45fe](https://github.com/lobehub/lobe-chat/commit/3dc45fe))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.6.0](https://github.com/lobehub/lobe-chat/compare/v0.5.0...v0.6.0)

<sup>Released on **2023-07-22**</sup>

#### ♻ Code Refactoring

- **misc**: 重构 selector 文件组织.

#### ✨ Features

- **misc**: 补充 token 详情.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Code refactoring

- **misc**: 重构 selector 文件组织 ([2ad0ef9](https://github.com/lobehub/lobe-chat/commit/2ad0ef9))

#### What's improved

- **misc**: 补充 token 详情 ([098f7ff](https://github.com/lobehub/lobe-chat/commit/098f7ff))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.5.0](https://github.com/lobehub/lobe-chat/compare/v0.4.3...v0.5.0)

<sup>Released on **2023-07-22**</sup>

#### ✨ Features

- **misc**: 支持选择 Emoji.

#### 🐛 Bug Fixes

- **misc**: 修正 total token 计算不正确的问题.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: 支持选择 Emoji ([6cb4828](https://github.com/lobehub/lobe-chat/commit/6cb4828))

#### What's fixed

- **misc**: 修正 total token 计算不正确的问题 ([17815c6](https://github.com/lobehub/lobe-chat/commit/17815c6))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.4.3](https://github.com/lobehub/lobe-chat/compare/v0.4.2...v0.4.3)

<sup>Released on **2023-07-22**</sup>

#### ♻ Code Refactoring

- **misc**: 优化 edit 代码结构.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Code refactoring

- **misc**: 优化 edit 代码结构 ([fdb3a3f](https://github.com/lobehub/lobe-chat/commit/fdb3a3f))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.4.2](https://github.com/lobehub/lobe-chat/compare/v0.4.1...v0.4.2)

<sup>Released on **2023-07-22**</sup>

#### 💄 Styles

- **misc**: Fix input style, fix layout.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### Styles

- **misc**: Fix input style ([504bd64](https://github.com/lobehub/lobe-chat/commit/504bd64))
- **misc**: Fix layout ([2d83aff](https://github.com/lobehub/lobe-chat/commit/2d83aff))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.4.1](https://github.com/lobehub/lobe-chat/compare/v0.4.0...v0.4.1)

<sup>Released on **2023-07-22**</sup>

#### 🐛 Bug Fixes

- **misc**: Fix SSR style error.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's fixed

- **misc**: Fix SSR style error ([289eae7](https://github.com/lobehub/lobe-chat/commit/289eae7))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.4.0](https://github.com/lobehub/lobe-chat/compare/v0.3.0...v0.4.0)

<sup>Released on **2023-07-20**</sup>

#### ✨ Features

- **misc**: Add styles and modify layout of FolderPanel, SliderWithInput, SessionList, EditPage, ChatLayout, and SettingLayout components, Introduce FOLDER_WIDTH constant and update components.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: Add styles and modify layout of FolderPanel, SliderWithInput, SessionList, EditPage, ChatLayout, and SettingLayout components ([7f19a09](https://github.com/lobehub/lobe-chat/commit/7f19a09))
- **misc**: Introduce FOLDER_WIDTH constant and update components ([c511964](https://github.com/lobehub/lobe-chat/commit/c511964))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.3.0](https://github.com/lobehub/lobe-chat/compare/v0.2.0...v0.3.0)

<sup>Released on **2023-07-18**</sup>

#### ✨ Features

- **misc**: Add new files, modify components, and adjust layout and styling.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: Add new files, modify components, and adjust layout and styling ([b8c3b38](https://github.com/lobehub/lobe-chat/commit/b8c3b38))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

## [Version 0.2.0](https://github.com/lobehub/lobe-chat/compare/v0.1.6...v0.2.0)

<sup>Released on **2023-07-18**</sup>

#### ✨ Features

- **misc**: Add import statement and define CSS styles for Avatar component.

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

#### What's improved

- **misc**: Add import statement and define CSS styles for Avatar component ([8c23a8d](https://github.com/lobehub/lobe-chat/commit/8c23a8d))

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>

### [Version 0.1.6](https://github.com/lobehub/lobe-chat/compare/v0.1.5...v0.1.6)

<sup>Released on **2023-07-18**</sup>

<br/>

<details>
<summary><kbd>Improvements and Fixes</kbd></summary>

</details>

<div align="right">

[![](https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square)](#readme-top)

</div>
