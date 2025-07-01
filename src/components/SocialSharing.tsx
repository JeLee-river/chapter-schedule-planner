
import { Share2, Heart, MessageCircle, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const SocialSharing = () => {
  const achievements = [
    {
      id: 1,
      title: '7일 연속 목표 달성!',
      description: '꾸준함이 최고의 실력입니다 🔥',
      likes: 24,
      comments: 8,
      time: '2시간 전'
    },
    {
      id: 2,
      title: '포모도로 100회 달성',
      description: '집중력 마스터가 되었습니다! 🍅',
      likes: 18,
      comments: 5,
      time: '1일 전'
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Share2 className="w-6 h-6 text-green-500" />
          <h3 className="text-xl font-bold text-gray-900">소셜 공유</h3>
        </div>
        <Button size="sm" className="bg-gradient-to-r from-green-500 to-blue-500">
          성취 공유하기
        </Button>
      </div>

      <div className="space-y-4">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
              <Trophy className="w-6 h-6 text-yellow-500 flex-shrink-0 ml-2" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-red-500 hover:text-red-600">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm font-medium">{achievement.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-blue-500 hover:text-blue-600">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">{achievement.comments}</span>
                </button>
              </div>
              <span className="text-xs text-gray-500">{achievement.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
        <h4 className="font-medium text-purple-800 mb-2">🎯 이번 주 목표</h4>
        <p className="text-sm text-purple-700 mb-3">
          매일 5개 이상 작업 완료하기 (현재 4/7일)
        </p>
        <div className="flex space-x-2">
          <Badge className="bg-purple-100 text-purple-800">진행중</Badge>
          <Badge className="bg-gray-100 text-gray-600">57% 달성</Badge>
        </div>
      </div>
    </div>
  );
};
