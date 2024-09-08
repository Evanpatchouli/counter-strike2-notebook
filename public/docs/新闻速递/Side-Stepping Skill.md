# Side-Stepping Skill

**Date** : 2024 / 08 / 20

## Original Article

Counter-Strike is constantly evolving. From art, to maps, to inventive plays, and even player input, the CS community shapes the game.

Scripting and automating player commands has always been contentious, but over the years some forms of scripting (e.g., jump-throws) have gained acceptance, as they enable plays that wouldn't otherwise be possible. In fact, jump-throws became such an important part of the game that we've done the work to make them reliable without any special scripting or binds (i.e., by jumping and quickly throwing a grenade).

Developing one's coordination and reaction time has always been key to mastering Counter-Strike.

Recently, some hardware features have blurred the line between manual input and automation, so we've decided to draw a clear line on what is or isn't acceptable in Counter-Strike.

We are no longer going to allow automation (via scripting or hardware) that circumvent these core skills and, moving forward, (and initially--exclusively on Valve Official Servers) players suspected of automating multiple player actions from a single game input may be kicked from their match.

To prevent accidental infractions, in-game binds that include more than one movement and/or attack actions will no longer work (e.g., null-binds and jump-throw binds).

If you have a keyboard that includes an input-automation feature (e.g., "Snap Tap Mode"), be sure to disable the feature before you join a match in order to avoid any interruption to your matches.

### Release Notes for 8/19/2024

#### [ INPUT ]

- Certain types of movement/shooting input automation such as hardware-assisted counter strafing will now be detected on Valve official servers, resulting in a kick from the match
- Input binds that include more than one of the following commands will now be ignored by default. Support can be re-enabled using the cheat-protected convar `cl_allow_multi_input_binds 1`
  - sprint, reload, attack, attack2, turnleft, turnright, turnup, turndown, forward, back, left, right, moveup, movedown, klook, use, jump, duck, strafe, zoom, yaw, pitch, forwardback, rightleft
- The jump-throw confirmation grunt sound can now be heard by other players nearby

#### [ VacNet ]

- Initial testing of VacNet 3.0 has begun on a limited set of matches. If you believe your match was incorrectly cancelled, email us the match details at csgoteamfeedback@valvesoftware.com

## 中文翻译

《反恐精英》不断发展。从艺术、地图到创新玩法，甚至玩家输入，CS 社区都在塑造着游戏。

编写脚本和自动化玩家命令一直存在争议，但多年来，某些形式的脚本（例如跳投）已获得认可，因为它们可以实现原本不可能实现的玩法。事实上，跳投已成为游戏中如此重要的一部分，我们已努力使其可靠，而无需任何特殊脚本或绑定（即通过跳跃和快速投掷手榴弹）。

培养协调能力和反应时间一直是掌握《反恐精英》的关键。

最近，一些硬件功能模糊了手动输入和自动化之间的界限，因此我们决定明确界定《反恐精英》中可接受和不可接受的内容。

我们将不再允许绕过这些核心技能的自动化（通过脚本或硬件），并且今后（最初仅在 Valve 官方服务器上），涉嫌通过单个游戏输入自动执行多个玩家操作的玩家可能会被踢出比赛。

为防止意外违规，包含多个移动和/或攻击操作的游戏内绑定将不再起作用（例如，空绑定和跳跃投掷绑定）。

如果您的键盘包含输入自动化功能（例如，“Snap Tap 模式”），请务必在加入比赛之前禁用该功能，以避免比赛中断。

### 2024 年 8 月 19 日发行说明

#### [ 输入 ]

- Valve 官方服务器现在会检测到某些类型的移动/射击输入自动化，例如硬件辅助反扫射，从而导致比赛被踢出
  包含以下多个命令的输入绑定现在将默认被忽略。
- 可以使用受作弊保护的 convar `cl_allow_multi_input_binds 1` 重新启用支持
  - 冲刺、重新加载、攻击、攻击 2、左转、右转、上转、下转、前进、后退、左转、右转、上移、下移、klook、使用、跳跃、躲避、扫射、缩放、偏航、俯仰、前进后退、右转左
- 附近的其他玩家现在可以听到跳跃投掷确认咕噜声

#### [ VacNet ]

- VacNet 3.0 的初步测试已在有限的几场比赛中开始。如果你认为你的比赛被错误取消，请将比赛详情通过电子邮件发送至 csgoteamfeedback@valvesoftware.com
