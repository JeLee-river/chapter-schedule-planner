
import { useState } from 'react';
import { Gift, Star, Palette, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface RewardSystemProps {
  currentPoints: number;
  onPointsChange: (newPoints: number) => void;
}

export const RewardSystem = ({ currentPoints, onPointsChange }: RewardSystemProps) => {
  const [ownedItems, setOwnedItems] = useState<string[]>(['basic-theme']);
  const { toast } = useToast();

  const rewards = [
    { id: 'sticker-pack-1', name: '스티커 팩 #1', cost: 50, type: 'sticker', icon: '🎨' },
    { id: 'blue-theme', name: '블루 테마', cost: 100, type: 'theme', icon: '🔵' },
    { id: 'productivity-badge', name: '생산성 마스터', cost: 200, type: 'badge', icon: '🏆' },
    { id: 'sticker-pack-2', name: '프리미엄 스티커', cost: 150, type: 'sticker', icon: '✨' },
    { id: 'dark-theme', name: '다크 테마', cost: 120, type: 'theme', icon: '🌙' },
    { id: 'focus-badge', name: '집중력 챔피언', cost: 300, type: 'badge', icon: '🎯' },
    { id: 'rainbow-theme', name: '레인보우 테마', cost: 180, type: 'theme', icon: '🌈' },
    { id: 'premium-stickers', name: '특별 이모지 팩', cost: 80, type: 'sticker', icon: '🚀' },
  ];

  const handlePurchase = (rewardId: string, cost: number, name: string) => {
    if (currentPoints >= cost && !ownedItems.includes(rewardId)) {
      setOwnedItems(prev => [...prev, rewardId]);
      onPointsChange(currentPoints - cost);
      
      toast({
        title: "구매 완료! 🎉",
        description: `"${name}"을(를) 성공적으로 구매했습니다!`,
      });
    } else if (currentPoints < cost) {
      toast({
        title: "포인트가 부족합니다",
        description: `${cost - currentPoints} 포인트가 더 필요합니다.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center space-x-2 mb-4">
        <Gift className="w-6 h-6 text-pink-500" />
        <h3 className="text-xl font-bold text-gray-900">리워드 샵</h3>
      </div>

      <div className="mb-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-medium text-yellow-800">
            사용 가능한 포인트: {currentPoints}
          </span>
        </div>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {rewards.map((reward) => {
          const isOwned = ownedItems.includes(reward.id);
          const canAfford = currentPoints >= reward.cost;

          return (
            <div
              key={reward.id}
              className={`p-3 rounded-lg border-2 transition-all ${
                isOwned 
                  ? 'border-green-300 bg-green-50' 
                  : canAfford 
                    ? 'border-blue-300 bg-blue-50 hover:bg-blue-100' 
                    : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{reward.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-900">{reward.name}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {reward.type === 'sticker' && <Palette className="w-3 h-3 mr-1" />}
                        {reward.type === 'theme' && <Palette className="w-3 h-3 mr-1" />}
                        {reward.type === 'badge' && <Trophy className="w-3 h-3 mr-1" />}
                        {reward.type}
                      </Badge>
                      <span className="text-sm font-medium text-gray-600">
                        {reward.cost} 포인트
                      </span>
                    </div>
                  </div>
                </div>

                {isOwned ? (
                  <Badge className="bg-green-500">
                    보유중
                  </Badge>
                ) : (
                  <Button
                    size="sm"
                    disabled={!canAfford}
                    onClick={() => handlePurchase(reward.id, reward.cost, reward.name)}
                    className={
                      canAfford 
                        ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700" 
                        : ""
                    }
                  >
                    {canAfford ? '구매' : '포인트 부족'}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          💡 작업 완료 시 우선순위에 따라 5-15 포인트를 획득합니다
        </p>
      </div>
    </div>
  );
};
