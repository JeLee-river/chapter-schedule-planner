
import { RewardSystem } from '@/components/RewardSystem';
import { PointsHistory } from '@/components/PointsHistory';
import { AchievementBadges } from '@/components/AchievementBadges';

const RewardPage = () => {
  const currentPoints = 120;

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">리워드 & 포인트</h1>
        <p className="text-gray-600">포인트를 모아 리워드를 받고 성취를 달성하세요</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <RewardSystem currentPoints={currentPoints} />
          <AchievementBadges />
        </div>
        
        <div>
          <PointsHistory />
        </div>
      </div>
    </div>
  );
};

export default RewardPage;
