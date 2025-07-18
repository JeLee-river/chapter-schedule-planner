
import { useState } from 'react';
import { Zap, Users, Calendar, Vote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CreateChallengeDialog } from '@/components/CreateChallengeDialog';
import { useToast } from '@/hooks/use-toast';

interface Challenge {
  id: number;
  title: string;
  description: string;
  progress?: number;
  votes?: number;
  participants: number;
  deadline: string;
  status: 'active' | 'voting' | 'completed';
}

export const GroupChallenge = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      title: '팀 집중 챌린지',
      description: '이번 주 팀원 모두 포모도로 50회 달성하기',
      progress: 68,
      participants: 4,
      deadline: '3일 남음',
      status: 'active'
    },
    {
      id: 2,
      title: '미팅 시간 투표',
      description: '다음 주 팀 회의 시간을 정해주세요',
      votes: 12,
      participants: 4,
      deadline: '1일 남음',
      status: 'voting'
    }
  ]);

  const { toast } = useToast();

  const meetingOptions = [
    { time: '월요일 10:00', votes: 3 },
    { time: '화요일 14:00', votes: 5 },
    { time: '수요일 16:00', votes: 4 }
  ];

  const handleCreateChallenge = (newChallenge: {
    title: string;
    description: string;
    type: string;
    duration: string;
  }) => {
    const challenge: Challenge = {
      id: challenges.length + 1,
      title: newChallenge.title,
      description: newChallenge.description,
      progress: 0,
      participants: 1,
      deadline: getDurationText(newChallenge.duration),
      status: 'active'
    };

    setChallenges(prev => [...prev, challenge]);
  };

  const getDurationText = (duration: string): string => {
    switch (duration) {
      case '3days': return '3일 남음';
      case '1week': return '7일 남음';
      case '2weeks': return '14일 남음';
      case '1month': return '30일 남음';
      default: return '1주일 남음';
    }
  };

  const handleVote = (optionIndex: number) => {
    toast({
      title: "투표가 완료되었습니다",
      description: `${meetingOptions[optionIndex].time}에 투표하셨습니다.`,
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center space-x-2 mb-6">
        <Zap className="w-6 h-6 text-yellow-500" />
        <h3 className="text-xl font-bold text-gray-900">그룹 챌린지</h3>
      </div>

      <div className="space-y-6">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{challenge.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                
                <div className="flex items-center space-x-3 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{challenge.participants}명 참여</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{challenge.deadline}</span>
                  </div>
                </div>
              </div>
              
              <Badge className={
                challenge.status === 'active' ? 'bg-green-100 text-green-800' :
                challenge.status === 'voting' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }>
                {challenge.status === 'active' ? '진행중' :
                 challenge.status === 'voting' ? '투표중' : '완료'}
              </Badge>
            </div>

            {challenge.status === 'active' && challenge.progress !== undefined && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">진행률</span>
                  <span className="font-medium">{challenge.progress}%</span>
                </div>
                <Progress value={challenge.progress} className="h-2" />
              </div>
            )}

            {challenge.status === 'voting' && (
              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Vote className="w-4 h-4" />
                  <span>총 {challenge.votes}표</span>
                </div>
                
                <div className="space-y-2">
                  {meetingOptions.map((option, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="text-sm">{option.time}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{option.votes}표</span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleVote(index)}
                        >
                          투표
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        <CreateChallengeDialog onCreateChallenge={handleCreateChallenge} />
      </div>
    </div>
  );
};
