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
    color: '#FF4D4D',
    position: 0,
    money: 1500,
    properties: []
  },
  {
    id: 2,
    name: '创业者',
    color: '#4CAF50',
    position: 0,
    money: 1500,
    properties: []
  },
  {
    id: 3,
    name: '产品经理',
    color: '#2196F3',
    position: 0,
    money: 1500,
    properties: []
  },
  {
    id: 4,
    name: '独立开发',
    color: '#FFC107',
    position: 0,
    money: 1500,
    properties: []
  }
];