
import { TeamDashboard } from '@/components/TeamDashboard';
import { SocialSharing } from '@/components/SocialSharing';
import { GroupChallenge } from '@/components/GroupChallenge';

const SocialTeamPage = () => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">소셜 & 팀</h1>
        <p className="text-gray-600">팀원들과 함께 목표를 달성하고 경험을 공유하세요</p>
      </div>

      <div className="space-y-8">
        <TeamDashboard />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SocialSharing />
          <GroupChallenge />
        </div>
      </div>
    </div>
  );
};

export default SocialTeamPage;
