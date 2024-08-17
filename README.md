# 狼人杀在线笔记

狼人杀在线笔记是一个为狼人杀游戏玩家设计的工具，方便玩家记录发言信息并导出，提高游戏体验。

**项目地址**：[点击访问](https://syhy0612.github.io/lrsNotes/) 。<a href="#官狼各游戏版型选择">官狼各游戏版型选择</a>

## TODO

### 添加自动保存笔记信息
- [x] <a href="#添加自动保存笔记信息">添加自动保存笔记信息</a>
- [x] <a href="#官狼各游戏版型选择">官狼各游戏版型选择</a>
- [x] <a href="#快捷记录起跳关键信息">快捷记录起跳关键信息</a>
- [ ] 计时器功能
- [ ] 玩家号码可以是6-12人之间
- [ ] 可以另外写一个给法官用的页面
- [ ] 添加导出功能，可以导出当局游戏记录图片或文字
- [ ] 支持做双层笔记记录，即同时记录战术或抿的身份等
- [ ] 添加暗黑模式

## 功能介绍

### 添加自动保存笔记信息
当用户在笔记内输入信息时，信息会自动保存到浏览器内存中，无需担心笔记信息丢失。（除非用户开了访客模式O.o）

### 官狼各游戏版型选择

> 截止网易狼人杀2024-08-17的开放版型

#### 常驻开放场

| 版型名称 | 版型配置                           |
| :------- | :--------------------------------- |
| 觉醒女巫 | 3狼-觉狼-4民-预-守-猎-觉女         |
| 标准场   | 4狼-4民-预-女-猎-愚                |
| 奇迹商人 | 3狼-狼王-4民-预-守-女-商           |
| 镜隐迷踪 | 3狼-觉隐-4民-镜-猎-女-守           |
| 丘比特场 | 2狼-狼王-5民-预-女-猎-愚-丘-千面人 |

#### 每周轮播场

| 版型名称     | 版型配置                       |
| :----------- | :----------------------------- |
| 觉醒孤独少女 | 4狼-3民-预-女-梦-猎-觉-孤      |
| 狼美人骑士   | 3狼-美-4民-预-女-守-骑         |
| 赤月猎魔人   | 3狼-赤月-4民-预-女-愚-猎魔     |
| 狼王守卫     | 3狼-狼王-4民-预-女-猎-守       |
| 白狼王骑士   | 3狼-白狼王-4民-预-女-守-骑     |
| 纯白夜影     | 3狼-巫-4民-守-女-猎-纯         |
| 动物梦境     | 3狼-美-4羊驼-白猫-河豚-子狐-熊 |
| 寻香识命     | 3狼-香-4民-守-女-猎-觉预       |
| 觉醒之夜     | 3狼-贵-4民-预-女-猎魔-觉愚     |
| 永序之轮     | 3狼-狼妃-4民-预-守-女-王子     |
| 孤独少女     | 4狼-3民-预-女-猎-守-孤独       |
| 噩梦之影     | 3狼-噩-4民-预-女-猎-梦         |
| 时波之乱     | 3狼-寂夜-4民-预-守-女-白昼     |
| 觉醒狼王     | 3狼-觉王-4民-预-女-商-梦       |
| 狼王摄梦人   | 3狼-狼王-4民-预-女-猎-梦       |
| 恶夜骑士     | 3狼-恶夜-4民-预-女-猎-守       |
| 狼王魔术师   | 3狼-狼王-4民-预-女-猎-术       |
| 白狼王守卫   | 3狼-白狼王-4民-预-女-猎-守     |
| 石像鬼守墓人 | 3狼-石-4民-预-女-猎-墓         |
| 迷雾鸦爪     | 3狼-狼鸦-4民-预-愚-梦-炼金     |
| 咒狐乌鸦     | 2狼-狼王-4民-预-女-猎-鸦-咒狐  |
| 猎日逐光     | 3狼-侍-4民-预-女-梦-爵         |

### 快捷记录起跳关键信息

当在笔记输入框输入`C`时，可快捷点击直接输入部分发言信息来修改。

例如在1号发言信息框内输入`C`时，会出现弹框`跳-预言家-发金水`，`跳-预言家-发查杀`等多个选项以供选择，选择`跳-预言家-发金水`后，即自动填入`CC预@0金水/1.2.3/ `，意为：1号玩家起跳预言家，发0号金水，警徽流为1，2，3顺验。具体查看表格示例。

`CC`：Choose Claim（起跳声称某种身份）

`CA`：Choose Abandon（放弃起跳或声称某种身份）

`0`：对施放技能玩家号码的默认值，在警徽流里也代指空。

> 示例说明

| 记作/RecordAs       | 解释/Describe                                                |
| ------------------- | ------------------------------------------------------------ |
| CC预@2查杀/7.11.12/ | 玩家起跳预言家，发2号查杀，警徽流7号、11号、12号。           |
| CC女巫@6银水        | 玩家起跳女巫，发6号银水。                                    |
| CA镜@9猎人/2.6.9/   | 玩家起跳魔镜少女，发9号猎人，警徽流2号、6号、9号，后<u>放弃起跳</u>。 |
| CC守卫/0/           | 玩家起跳守卫，第一天<u>空盾</u>。                            |

Tip0：作者自写的一套自用的快捷记录方案，暂时不会写进设置里去diy，有兴趣可以自行拉取代码修改哦。

Tip1：后续会添加其他版型的起跳信息，并按照版型去归纳，敬请期待。

Tip2：暂不打算添加多次起跳身份情况的记录方案，如果有好的建议，欢迎提`Issue`。

## 引用说明

部分图标素材取自阿里巴巴矢量图标库 [https://www.iconfont.cn/]