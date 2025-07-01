
import { Trophy, Star, Zap, Target, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const AchievementBadges = () => {
  const achievements = [
    { 
      id: 1, 
      name: '첫 걸음', 
      description: '첫 작업 완료', 
      icon: '🌟', 
      earned: true, 
      earnedDate: '2024-01-10',
      rarity: 'common'
    },
    { 
      id: 2, 
      name: '집중 마스터', 
      description: '포모도로 세션 50회 완료', 
      icon: '🎯', 
      earned: true, 
      earnedDate: '2024-01-14',
      rarity: 'rare'
    },
    { 
      id: 3, 
      name: '일주일 챌린저', 
      description: '7일 연속 목표 달성', 
      icon: '🔥', 
      earned: false, 
      progress: 5,
      total: 7,
      rarity: 'epic'
    },
    { 
      id: 4, 
      name: '효율성 전문가', 
      description: '평균 집중도 90% 이상 유지', 
      icon: '⚡', 
      earned: false, 
      progress: 87,
      total: 90,
      rarity: 'legendary'
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'rare':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'epic':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'legendary':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center space-x-2 mb-6">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h3 className="text-xl font-bold text-gray-900">성취 배지</h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-4 rounded-lg border-2 transition-all ${
              achievement.earned 
                ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300' 
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`text-3xl ${!achievement.earned && 'grayscale opacity-50'}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className={`font-bold ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                      {achievement.name}
                    </h4>
                    <Badge className={getRarityColor(achievement.rarity)}>
                      {achievement.rarity}
                    </Badge>
                  </div>
                  <p className={`text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                    {achievement.description}
                  </p>
                  
                  {achievement.earned ? (
                    <p className="text-xs text-green-600 mt-1">
                      획득일: {achievement.earnedDate}
                    </p>
                  ) : achievement.progress !== undefined ? (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>진행률</span>
                        <span>{achievement.progress}/{achievement.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(achievement.progress! / achievement.total!) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
        <h4 className="font-medium text-purple-800 mb-2">🏆 배지 컬렉션</h4>
        <div className="flex justify-between text-sm text-purple-700">
          <span>획득한 배지: 2/4</span>
          <span>완료율: 50%</span>
        </div>
      </div>
    </div>
  );
};
