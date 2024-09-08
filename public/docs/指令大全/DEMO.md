# DEMO

```cfg
// demo.cfg
alias +pause_demo "demo_pause 0; alias toggle_pause_demo -pause_demo";
alias -pause_demo "demo_pause 1; alias toggle_pause_demo +pause_demo"; // 一秒后继续播放
alias toggle_pause_demo +pause_demo;
bind ENTER toggle_pause_demo;

bind F12 "demoui";

alias toggle_show_xray "toggle spec_show_xray 0 1"
bind x toggle_show_xray;

// alias .undemo "bind ENTER attack;bind x slot12;"
```
