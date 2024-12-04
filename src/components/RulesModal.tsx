import React from 'react';
import { X } from 'lucide-react';

interface RulesModalProps {
  onClose: () => void;
}

const RulesModal: React.FC<RulesModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-amber-950/95 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative backdrop-blur-sm border border-amber-900/50">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-amber-200/60 hover:text-amber-200"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-amber-100 mb-6">奥马哈投资酒馆规则</h2>
        <div className="space-y-6 text-amber-200">
          <section>
            <h3 className="text-lg font-semibold text-amber-100 mb-3">巴菲特的投资法则</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>每位投资者初始获得 1500 金币的启动资金</li>
              <li>投资者轮流掷骰子，在投资市场中寻找机会</li>
              <li>经过酒馆入口可获得 200 金币的投资红利</li>
              <li>遇到市场机遇时，会触发随机的投资事件</li>
              <li>可以购买未被投资的优质公司股票</li>
              <li>持有股票可以获得定期的股息收益</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold text-amber-100 mb-3">投资成功的标准</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>第一个资产达到 5000 金币的投资者获胜</li>
              <li>当有投资者破产时，资产最多的投资者胜出</li>
              <li>成功投资 5 家或以上优质公司的投资者可以宣布胜利</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-amber-100 mb-3">巴菲特的投资建议</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>专注于价值投资，寻找被低估的优质公司</li>
              <li>保持长期持有，让时间成为你的朋友</li>
              <li>市场波动时保持冷静，这可能是最好的投资机会</li>
              <li>不要投资你不了解的公司</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RulesModal; 