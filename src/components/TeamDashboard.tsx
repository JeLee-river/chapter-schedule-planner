
import { Users, Target, TrendingUp, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export const TeamDashboard = () => {
  const teamMembers = [
    { id: 1, name: '김팀장', progress: 85, status: 'active', todayTasks: 8 },
    { id: 2, name: '이개발', progress: 72, status: 'active', todayTasks: 6 },
    { id: 3, name: '박디자인', progress: 90, status: 'break', todayTasks: 7 },
    { id: 4, name: '최기획', progress: 64, status: 'inactive', todayTasks: 5 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'break': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '작업 중';
      case 'break': return '휴식 중';
      case 'inactive': return '오프라인';
      default: return '알 수 없음';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-bold text-gray-900">팀 대시보드</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-600">78%</div>
          <div className="text-sm text-blue-700">팀 평균 달성률</div>
        </div>
        
        <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
          <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600">↑12%</div>
          <div className="text-sm text-green-700">지난 주 대비</div>
        </div>
        
        <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
          <Clock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-600">26</div>
          <div className="text-sm text-purple-700">오늘 완료 작업</div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-gray-900">팀원 현황</h4>
        {teamMembers.map((member) => (
          <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                {member.name.charAt(0)}
              </div>
              <div>
                <h5 className="font-medium text-gray-900">{member.name}</h5>
                <p className="text-sm text-gray-500">오늘 {member.todayTasks}개 작업</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-20">
                <Progress value={member.progress} className="h-2" />
              </div>
              <span className="text-sm font-medium text-gray-700">{member.progress}%</span>
              <Badge className={getStatusColor(member.status)}>
                {getStatusText(member.status)}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
