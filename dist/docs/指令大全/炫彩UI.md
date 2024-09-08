# 炫彩 UI

## bind-rinbow.cfg

```
// 变回原先的 UI 和准星颜色的指令
alias .default_crosshair_color "cl_crosshaircolor 1;cl_crosshaircolor_r 50;cl_crosshaircolor_g 250;cl_crosshaircolor_b 50";
alias .default_hud_color "cl_hud_color 0";
// 绑定鼠标左键、右键、滚轮向下为炫彩 UI
bind MOUSE1 "+attack;+rainbowize";
bind MOUSE2 "+attack2;+rainbowize";
bind MWHEELDOWN "+jump;+rainbowize";
```

## rainbow.cfg

```cfg
alias +rainbowize "toggle cl_hud_color 0 1 2 3 4 5 6 7 8 9 10 11;toggle cl_crosshaircolor 0 1 2 3 4 5 6 7 8 9 10 11";
alias unrainowize ".default_crosshair_color;.default_hud_color";
alias -rainbowize unrainbowize;
alias .rainbow "exec bind-rainbow.cfg";
alias .unrainbow unrainbowize;
```

执行：`exec rainbow.cfg` 后在控制台输入：`.rainbow` 鼠标左键、右键、滚轮向下会使 UI 和准星颜色会变为动感炫彩。
