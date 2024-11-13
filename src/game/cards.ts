export interface Card {
  title: string;
  description: string;
  effect: 'money' | 'move' | 'special';
  value: number;
  message: string;
}

export const chanceCards: Card[] = [
  {
    title: '产品爆火',
    description: '你的小产品突然在社交媒体上爆火',
    effect: 'money',
    value: 200,
    message: '获得 200 元广告收入！'
  },
  {
    title: '服务器宕机',
    description: '你的产品突然宕机，需要紧急处理',
    effect: 'money',
    value: -150,
    message: '支付 150 元维护费用'
  },
  {
    title: '创业大会',
    description: '参加创业大会，直接前往效率工具格子',
    effect: 'move',
    value: 15,
    message: '移动到效率工具格子'
  },
  {
    title: '摸鱼被抓',
    description: '上班摸鱼被老板抓包',
    effect: 'move',
    value: 10,
    message: '立刻去修Bug！'
  },
  {
    title: '天使投资',
    description: '获得天使投资人青睐',
    effect: 'money',
    value: 500,
    message: '获得 500 元投资'
  },
  {
    title: '代码写崩了',
    description: '代码写崩了，需要回滚版本',
    effect: 'move',
    value: -3,
    message: '后退三格'
  }
];