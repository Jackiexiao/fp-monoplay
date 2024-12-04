import { LucideIcon } from 'lucide-react';
import { 
  Building2, Landmark, Beer, DollarSign, 
  LineChart, TrendingUp, Coins, Wallet,
  Banknote, PiggyBank, Trophy
} from 'lucide-react';

export interface Space {
  name: string;
  type: 'property' | 'chance' | 'tax' | 'special';
  icon?: LucideIcon;
  price?: number;
  description: string;
  owner: number | null;
}

export const createPropertySpace = (
  name: string, 
  price: number, 
  icon: LucideIcon, 
  description: string
): Space => ({
  name,
  type: 'property',
  price,
  icon,
  description,
  owner: null
});

export let boardSpaces: Space[] = [
  { name: '酒馆入口', type: 'special', icon: Trophy, description: '每次经过获得200金币的投资红利', owner: null },
  createPropertySpace('可口可乐', 100, PiggyBank, '巴菲特最爱的饮料公司'),
  { name: '市场波动', type: 'chance', icon: LineChart, description: '市场行情有变化', owner: null },
  createPropertySpace('美国运通', 120, Wallet, '金融支付巨头'),
  createPropertySpace('苹果公司', 150, DollarSign, '科技创新领袖'),
  { name: '投资课程', type: 'special', icon: Beer, description: '在酒馆听巴菲特讲课', owner: null },
  createPropertySpace('伯克希尔', 200, Building2, '巴菲特的投资帝国'),
  { name: '市场机遇', type: 'chance', icon: TrendingUp, description: '新的投资机会', owner: null },
  createPropertySpace('摩根大通', 180, Landmark, '百年金融巨头'),
  createPropertySpace('富国银行', 160, Coins, '老牌银行股'),
  createPropertySpace('雪佛龙', 200, Banknote, '能源巨头'),
  createPropertySpace('卡夫亨氏', 220, PiggyBank, '食品饮料龙头'),
  { name: '价值投资', type: 'chance', icon: LineChart, description: '巴菲特的投资智慧', owner: null },
  createPropertySpace('美国银行', 240, Wallet, '全美最大银行'),
  createPropertySpace('通用汽车', 260, Building2, '汽车工业巨头'),
  { name: '复盘总结', type: 'special', icon: Beer, description: '在酒馆复盘投资经验', owner: null },
  createPropertySpace('可口可乐', 280, PiggyBank, '百年饮料帝国'),
  createPropertySpace('高盛集团', 300, Landmark, '华尔街投行之王'),
  { name: '长期投资', type: 'chance', icon: TrendingUp, description: '价值投资新机遇', owner: null },
  createPropertySpace('微软公司', 350, Building2, '科技行业巨擘'),
  createPropertySpace('OpenAI', 120, Building2, 'AI 独角兽')
];

export const updateSpaceOwner = (position: number, newOwner: number | null) => {
  boardSpaces[position] = {
    ...boardSpaces[position],
    owner: newOwner
  };
};