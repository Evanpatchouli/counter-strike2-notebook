

const tabs = [
  {
    id: "0",
    title: "新闻速递",
    path: "新闻速递",
    icon: "",
    children: [
      {
        id: "0.1",
        title: "Side-Stepping Skill",
        path: "新闻速递/Side-Stepping Skill",
        icon: "",
        type: "button",
      },
    ],
    type: "dropdown",
  },
  {
    id: "1",
    title: "皮肤图鉴",
    path: "皮肤图鉴",
    icon: "",
    children: [
      {
        id: "1.1",
        title: "千瓦武器箱",
        path: "皮肤图鉴/千瓦武器箱",
        icon: "",
        type: "button",
      },
    ],
    type: "dropdown",
  },
  {
    id: "2",
    title: "道具手册",
    icon: "",
    type: "dropdown",
    children: [
      {
        id: "2-1",
        title: "道具介绍",
        path: "道具手册/道具介绍",
        icon: "",
        type: "button",
      },
      {
        id: "2-2",
        title: "炙热沙城",
        icon: "",
        type: "dropdown",
        children: [
          {
            id: "2-2-1",
            title: "烟雾弹",
            icon: "",
            type: "dropdown",
            children: [
              {
                id: "2-2-1-1",
                title: "A门烟",
                path: "道具手册/炙热沙城/烟雾弹/A门烟",
                icon: "",
                type: "button",
              },
              {
                id: "2-2-1-2",
                title: "A大满封烟",
                path: "道具手册/炙热沙城/烟雾弹/A大满封烟",
                icon: "",
                type: "button",
              },
              {
                id: "2-2-1-3",
                title: "A包烟",
                path: "道具手册/炙热沙城/烟雾弹/A包烟",
                icon: "",
                type: "button",
              },
              {
                id: "2-2-1-4",
                title: "暗道烟",
                path: "道具手册/炙热沙城/烟雾弹/暗道烟",
                icon: "",
                type: "button",
              },
              {
                id: "2-2-1-5",
                title: "B通烟",
                path: "道具手册/炙热沙城/烟雾弹/B通烟",
                icon: "",
                type: "button",
              },
              {
                id: "2-2-1-6",
                title: "A平台过点烟",
                path: "道具手册/炙热沙城/烟雾弹/A平台过点烟",
                icon: "",
                type: "button",
              },
              {
                id: "2-2-1-7",
                title: "中门烟",
                path: "道具手册/炙热沙城/烟雾弹/中门烟",
                icon: "",
                type: "button",
              },
              {
                id: "2-2-1-8",
                title: "Xbox烟",
                path: "道具手册/炙热沙城/烟雾弹/Xbox烟",
                icon: "",
                type: "button",
              },
              {
                id: "2-2-1-9",
                title: "B1烟",
                path: "道具手册/炙热沙城/烟雾弹/B1烟",
                icon: "",
                type: "button",
              },
              {
                id: "2-2-1-10",
                title: "B门烟",
                path: "道具手册/炙热沙城/烟雾弹/B门烟",
                icon: "",
                type: "button",
              },
              {
                id: "2-2-1-11",
                title: "B大箱隔断烟",
                path: "道具手册/炙热沙城/烟雾弹/B大箱隔断烟",
                icon: "",
                type: "button",
              },
              {
                id: "2-2-1-12",
                title: "狗洞烟",
                path: "道具手册/炙热沙城/烟雾弹/狗洞烟",
                icon: "",
                type: "button",
              },
              {
                id: "2-2-1-13",
                title: "白车烟",
                path: "道具手册/炙热沙城/烟雾弹/白车烟",
                icon: "",
                type: "button",
              },
              {
                id: "2-2-1-14",
                title: "A大过点烟",
                path: "道具手册/炙热沙城/烟雾弹/A大过点烟",
                icon: "",
                type: "button",
              },
              {
                id: "2-2-1-15",
                title: "CT过点烟",
                path: "道具手册/炙热沙城/烟雾弹/CT过点烟",
                icon: "",
                type: "button",
              },
              {
                id: "2-2-1-16",
                title: "CT深烟",
                path: "道具手册/炙热沙城/烟雾弹/CT深烟",
                icon: "",
                type: "button",
              },
              {
                id: "2-2-1-17",
                title: "CT警家烟",
                path: "道具手册/炙热沙城/烟雾弹/CT警家烟",
                icon: "",
                type: "button",
              },
              {
                id: "2-2-1-18",
                title: "A小烟",
                path: "道具手册/炙热沙城/烟雾弹/A小烟",
                icon: "",
                type: "button",
              },
              {
                id: "2-2-1-19",
                title: "匪口烟",
                path: "道具手册/炙热沙城/烟雾弹/匪口烟",
                icon: "",
                type: "button",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "战术手册",
    path: "战术手册",
    icon: "",
    type: "dropdown",
    children: [
      {
        id: "3-1",
        title: "战术介绍",
        path: "战术手册/战术介绍",
        icon: "",
        type: "button",
      },
      {
        id: "3-2",
        title: "炙热沙城",
        icon: "",
        type: "dropdown",
        children: [
          {
            id: "3-2-1",
            title: "地图点位",
            icon: "",
            type: "button",
            path: "战术手册/炙热沙城/地图点位",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    title: "职业赛事",
    path: "职业赛事",
    icon: "",
    children: [],
    type: "dropdown",
  },
  {
    id: "5",
    title: "职业选手",
    path: "职业选手",
    icon: "",
    children: [],
    type: "dropdown",
  },
  {
    id: "6",
    title: "指令大全",
    path: "指令大全",
    icon: "",
    children: [
      {
        id: "6-1",
        title: "基本知识",
        path: "指令大全/基本知识",
        icon: "",
        type: "button",
      },
      {
        id: "6-2",
        title: "自动急停",
        path: "指令大全/自动急停",
        icon: "",
        type: "button",
      },
      {
        id: "6-3",
        title: "快速丢闪",
        path: "指令大全/快速丢闪",
        icon: "",
        type: "button",
      },
      {
        id: "6-4",
        title: "去除爆弹效果",
        path: "指令大全/去除爆弹效果",
        icon: "",
        type: "button",
      },
      {
        id: "6-5",
        title: "跑图必备指令",
        path: "指令大全/跑图必备指令",
        icon: "",
        type: "button",
      },
      {
        id: "6-6",
        title: "炫彩UI",
        path: "指令大全/炫彩UI",
        icon: "",
        type: "button",
      },
    ],
    type: "dropdown",
  },
  {
    id: "7",
    title: "游戏设置",
    path: "游戏设置",
    icon: "",
    children: [],
    type: "dropdown",
  },
  {
    id: "8",
    title: "创意工坊",
    path: "创意工坊",
    icon: "",
    children: [],
    type: "dropdown",
  },
  {
    id: "9",
    title: "值得收藏",
    path: "值得收藏",
    icon: "",
    children: [],
    type: "dropdown",
  },
] as Tab[];

export default tabs;

export type Tab = {
  id: string;
  title: string;
  path?: string;
  icon?: string;
  children?: Tab[];
  type: "button" | "dropdown" | "text";
};

export function flattenTabs(): Tab[] {
  const result: Tab[] = [];

  function recurse(tabArray: Tab[]) {
    for (const tab of tabArray) {
      result.push(tab);
      if (tab.children) {
        recurse(tab.children);
      }
    }
  }

  recurse(tabs);
  return result;
}

