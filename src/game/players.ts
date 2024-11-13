export interface Player {
  id: number;
  name: string;
  color: string;
  position: number;
  money: number;
  properties: number[];
}

export const initialPlayers: Player[] = [
  {
    id: 1,
    name: '打工人',
    color: '#FF6B6B',
    position: 0,
    money: 1500,
    properties: []
  },
  {
    id: 2,
    name: '创业者',
    color: '#4ECDC4',
    position: 0,
    money: 1500,
    properties: []
  },
  {
    id: 3,
    name: '产品经理',
    color: '#45B7D1',
    position: 0,
    money: 1500,
    properties: []
  },
  {
    id: 4,
    name: '独立开发',
    color: '#96CEB4',
    position: 0,
    money: 1500,
    properties: []
  }
];