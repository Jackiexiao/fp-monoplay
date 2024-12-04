export interface Card {
  title: string;
  description: string;
  effect: 'money' | 'move' | 'special';
  value: number;
  message: string;
}

export const chanceCards: Card[] = [
  {
    title: '股市牛市',
    description: '股票价格上涨，获得收益',
    effect: 'money',
    value: 300,
    message: '股市上涨，获得 300 元收益！'
  },
  {
    title: '房地产升值',
    description: '你的房产价值增加',
    effect: 'money',
    value: 250,
    message: '房地产升值，资产增加 250 元！'
  },
  {
    title: '创业成功',
    description: '你的创业项目获得成功',
    effect: 'money',
    value: 400,
    message: '创业成功，赚取 400 元！'
  },
  {
    title: '市场危机',
    description: '经济下滑，投资受损',
    effect: 'money',
    value: -200,
    message: '市场危机，损失 200 元！'
  },
  {
    title: '投资顾问建议',
    description: 'AI 提供投资建议',
    effect: 'special',
    value: 0,
    message: 'AI 建议你分散投资'
  },
  {
    title: '财务规划',
    description: '进行财务规划，优化资产配置',
    effect: 'special',
    value: 100,
    message: '财务规划成功，资产增加 100 元！'
  },
  {
    title: '税务审计',
    description: '遭遇税务审计，需支付罚款',
    effect: 'money',
    value: -150,
    message: '税务审计，支付 150 元罚款！'
  },
  {
    title: '慈善捐赠',
    description: '参与慈善活动，获得社会声誉',
    effect: 'special',
    value: 0,
    message: '慈善捐赠，提升社会声誉'
  }
];