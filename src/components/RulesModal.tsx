import React from 'react';
import { X } from 'lucide-react';

interface RulesModalProps {
  onClose: () => void;
}

const RulesModal: React.FC<RulesModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/60 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">游戏规则</h2>
        <div className="space-y-6 text-gray-200">
          <section>
            <h3 className="text-lg font-semibold text-white mb-3">基本规则</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>每位玩家初始获得 1500 元启动资金</li>
              <li>玩家轮流掷骰子，按点数在棋盘上移动</li>
              <li>经过起点可获得 200 元奖励</li>
              <li>踩到机会格子时，随机抽取一张机会卡片</li>
              <li>踩到税收格子时，需要支付相应金额</li>
              <li>可以购买空置的产品格子，成为产品拥有者</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold text-white mb-3">胜利条件</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>第一个资产达到 5000 元的玩家获胜</li>
              <li>当有玩家破产（资金为 0）时，资产最多的玩家获胜</li>
              <li>拥有 5 个或以上产品的玩家可以宣布胜利</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RulesModal; 