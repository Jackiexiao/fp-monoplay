# 创业大富翁 startup-monopoly

![image](./public/screenshot.jpg)

一个完全由 Bolt.new 和 Cursor 生成的小游戏（大概花了我 3 个小时 Debug & 跟AI 许愿式编程）

基于 React + TypeScript 开发的创业主题大富翁游戏。玩家可以通过购买各种互联网产品来积累财富，体验创业者的生活。

## 🎮 游戏特性

- 🎲 多人轮流掷骰子，在棋盘上移动
- 💰 购买和交易各种互联网产品
- 🎯 多种胜利条件
- 🎨 精美的 UI 设计和动画效果
- 🎁 随机事件和机会卡片
- 📱 响应式设计，支持多种设备

## 🎯 游戏规则

### 基本规则
- 每位玩家初始获得 1500 元启动资金
- 玩家轮流掷骰子，按点数在棋盘上移动
- 经过起点可获得 200 元奖励
- 踩到机会格子时，随机抽取一张机会卡片
- 踩到税收格子时，需要支付相应金额
- 可以购买空置的产品格子，成为产品拥有者

### 胜利条件
- 第一个资产达到 5000 元的玩家获胜
- 当有玩家破产（资金为 0）时，资产最多的玩家获胜
- 拥有 5 个或以上产品的玩家可以宣布胜利

## 🛠️ 技术栈

- React 18
- TypeScript
- Tailwind CSS
- Lucide Icons
- Vite

## 🚀 本地开发

1. 克隆项目 
```bash
git clone https://github.com/yourusername/startup-monopoly.git
```
2. 安装依赖
bash
cd startup-monopoly
npm install
3. 启动开发服务器
```bash
npm run dev
```
4. 构建
```bash
npm run build
```

构建后的文件将生成在 `dist` 目录下。

## 🎨 游戏界面

- 棋盘布局：40个格子围绕成长方形
- 中央区域：显示骰子和玩家信息
- 格子类型：
  - 🏢 产品格子（可购买）
  - 💡 机会格子
  - 💰 税收格子
  - ⭐ 特殊格子

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📝 开源协议

[MIT License](LICENSE)