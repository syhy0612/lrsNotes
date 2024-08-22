# 🐺 狼人杀在线笔记

狼人杀在线笔记是一个为狼人杀游戏玩家设计的工具，方便玩家记录发言信息并导出，提高游戏体验。

📌 在线使用：[点击访问](https://lrs-notes.vercel.app)

## 🛠 功能模块

### ✅ 已完成

- [x] [添加自动保存笔记信息](#-添加自动保存笔记信息)
- [x] [官狼各游戏版型选择](#-官狼各游戏版型选择)
- [x] [快捷记录起跳关键信息](#-快捷记录起跳关键信息)

### 📝 TODO

- [ ] PC端可自定义布局
- [ ] 添加重置功能
- [ ] 计时器功能
- [ ] 玩家号码可以是6-12人之间
- [ ] 可以另外写一个给法官用的页面
- [ ] 添加导出功能，可以导出当局游戏记录图片或文字
- [ ] 支持做双层笔记记录，即同时记录战术或抿的身份等
- [ ] 添加暗黑模式

## 📒 功能介绍

### 💾 添加自动保存笔记信息

当用户在笔记内输入信息时，信息会自动保存到浏览器内存中，笔记信息需要手动重置才会清除，无需担心笔记信息丢失。

> Tip： 除非用户开了访客模式。

### 📜 官狼各游戏版型选择

#### 常驻开放场

| 版型名称 | 版型配置                   |
|:-----|:-----------------------|
| 觉醒女巫 | 3狼-觉狼-4民-预-守-猎-觉女      |
| 标准场  | 4狼-4民-预-女-猎-愚          |
| 奇迹商人 | 3狼-狼王-4民-预-守-女-商       |
| 镜隐迷踪 | 3狼-觉隐-4民-镜-猎-女-守       |
| 丘比特场 | 2狼-狼王-5民-预-女-猎-愚-丘-千面人 |

#### 每周轮播场

| 版型名称   | 版型配置                |
|:-------|:--------------------|
| 觉醒孤独少女 | 4狼-3民-预-女-梦-猎-觉-孤   |
| 狼美人骑士  | 3狼-美-4民-预-女-守-骑     |
| 赤月猎魔人  | 3狼-赤月-4民-预-女-愚-猎魔   |
| 狼王守卫   | 3狼-狼王-4民-预-女-猎-守    |
| 白狼王骑士  | 3狼-白狼王-4民-预-女-守-骑   |
| 纯白夜影   | 3狼-巫-4民-守-女-猎-纯     |
| 动物梦境   | 3狼-美-4羊驼-白猫-河豚-子狐-熊 |
| 寻香识命   | 3狼-香-4民-守-女-猎-觉预    |
| 觉醒之夜   | 3狼-贵-4民-预-女-猎魔-觉愚   |
| 永序之轮   | 3狼-狼妃-4民-预-守-女-王子   |
| 孤独少女   | 4狼-3民-预-女-猎-守-孤独    |
| 噩梦之影   | 3狼-噩-4民-预-女-猎-梦     |
| 时波之乱   | 3狼-寂夜-4民-预-守-女-白昼   |
| 觉醒狼王   | 3狼-觉王-4民-预-女-商-梦    |
| 狼王摄梦人  | 3狼-狼王-4民-预-女-猎-梦    |
| 恶夜骑士   | 3狼-恶夜-4民-预-女-猎-守    |
| 狼王魔术师  | 3狼-狼王-4民-预-女-猎-术    |
| 白狼王守卫  | 3狼-白狼王-4民-预-女-猎-守   |
| 石像鬼守墓人 | 3狼-石-4民-预-女-猎-墓     |
| 迷雾鸦爪   | 3狼-狼鸦-4民-预-愚-梦-炼金   |
| 咒狐乌鸦   | 2狼-狼王-4民-预-女-猎-鸦-咒狐 |
| 猎日逐光   | 3狼-侍-4民-预-女-梦-爵     |

> Tip：截止网易狼人杀2024-08-17的开放版型。

### ⚡ 快捷记录起跳关键信息

#### 省流说明

1. 在任意玩家的发言信息框内输入`C`。
2. 系统会弹出多个预设选项，如`跳-预言家-发金水`、`跳-预言家-发查杀`等。
3. 选择合适的选项后，系统会自动填入相应的模版信息。

#### 参考示例

| 记作/RecordAs      | 解释/Describe                              |
|------------------|------------------------------------------|
| CC预@2查杀/7.11.12/ | 玩家起跳预言家，发2号查杀，警徽流7号、11号、12号。             |
| CC女巫@6银水         | 玩家起跳女巫，发6号银水。                            |
| CA镜@9猎人/2.6.9/   | 玩家起跳魔镜少女，发9号猎人，警徽流2号、6号、9号，后<u>放弃起跳</u>。 |
| CC守卫/0/          | 玩家起跳守卫，第一天<u>空盾</u>。                     |

#### 补充说明

`CC`：Choose Claim （选择起跳声称某种身份）

`CA`：Choose Abandon（放弃起跳或声称某种身份）

`0`：对施放技能玩家号码的默认值，在警徽流里也代指空。

> Tip0：作者自写的一套自用的快捷记录方案，暂时不会写进设置里去diy，有兴趣可以自行拉取代码修改哦。
>
> Tip1：后续会添加其他版型的起跳信息，并按照版型去归纳，敬请期待。
>
> Tip2：暂不打算添加多次起跳身份情况的记录方案，如果有好的建议，欢迎提`Issue`。

## 💡 项目背景

这个小项目源于我观看狼人杀游戏直播时的一个发现。我注意到大多数主播用记事本等工具记录游戏中的发言信息，觉得不太方便。于是我在网上查找有关狼人杀的笔记工具，但遗憾的是，那时的我并没有找到特别合适的工具。

2024年6月初，实习结束后，我决定自己尝试制作一个专门的狼人杀在线笔记页面。作为前端小白，借助AI工具，我花了两周时间东拼西凑做了一个简易版本，那时候只会用基础的`HTML`、`CSS`
和一点点`JavaScript`
，连怎么修改角色标记都不会，最后不得不暂时搁置。虽然做得很不专业，但那个简易的版本见证了新版本的起点。我把它保存在了`old`
分支里，作为我学习历程的一个纪念。

2024年7月初，因工作需要，我开始学习`Vue3`的基础，以及`Echarts`和`Element Plus`的简单使用。

2024年8月初，因试用期能力不足，我从公司离职，这次经历让我认识到自己还有很多需要学习的地方。离职后，我决定重新投入到这个项目中，借此机会提升自己的技能。我用`Vue3`
框架重写了这个项目，新版本放在了`main`分支。借助`Claude`等AI工具的帮助，我逐步改进了这个小项目。虽然比最初的尝试有所进步，但我清楚还有很大的提升空间。

## 👨‍💻 开发者说明

这个小项目采用了MIT协议开源。如果您觉得它有任何可取之处：

- 欢迎Fork去自由修改，也许您能把它变得更好。
- [MIT许可证](./LICENSE)允许您在遵守协议的前提下自由使用和分发。

由于我的技术水平还很有限，可能无法处理复杂的改动，但非常欢迎：

- 在Issues中分享您的想法或建议，无论大小。
- 如果您做了什么有趣的改进，也欢迎在Issues里告诉大家。

## 💬 反馈与交流

如果您在使用过程中有任何问题、建议或想法，欢迎提Issue交流。

Issue：[点击跳转](https://github.com/syhy0612/lrsNotes/issues)

Email：syhy0612@163.com

感谢您对这个小项目的关注，祝您游戏愉快！

如果您觉得这个项目对您有所帮助，欢迎点个star⭐支持一下。您的每一个星星都是我继续改进的动力！

## ⭐ Star历史

[![Star History Chart](https://api.star-history.com/svg?repos=syhy0612/lrsNotes&type=Date)](https://star-history.com/#syhy0612/lrsNotes&Date)
