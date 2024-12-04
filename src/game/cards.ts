export interface Card {
  title: string;
  description: string;
  effect: 'money' | 'move';
  value: number;
}

export const chanceCards: Card[] = [
  {
    title: '价值投资',
    description: '巴菲特说："要在别人恐惧时贪婪"，获得200金币的投资机会',
    effect: 'money',
    value: 200
  },
  {
    title: '市场波动',
    description: '市场突然下跌，损失100金币',
    effect: 'money',
    value: -100
  },
  {
    title: '股息收益',
    description: '你的投资获得丰厚的股息，收获150金币',
    effect: 'money',
    value: 150
  },
  {
    title: '市场调整',
    description: '市场进入调整期，后退3格',
    effect: 'move',
    value: -3
  },
  {
    title: '牛市来临',
    description: '市场进入牛市，向前冲刺3格',
    effect: 'move',
    value: 3
  },
  {
    title: '投资讲座',
    description: '参加巴菲特的投资讲座，获得100金币的见解',
    effect: 'money',
    value: 100
  },
  {
    title: '市场崩盘',
    description: '遭遇金融危机，损失150金币',
    effect: 'money',
    value: -150
  },
  {
    title: '长期持有',
    description: '坚持长期持有策略，获得180金币的收益',
    effect: 'money',
    value: 180
  }
];