
import { TrendingUp, Calendar, Trophy } from 'lucide-react';

export const PointsHistory = () => {
  const pointsHistory = [
    { id: 1, action: '작업 완료', points: 10, date: '2024-01-15 15:30', type: 'task' },
    { id: 2, action: '포모도로 세션 완료', points: 25, date: '2024-01-15 14:00', type: 'pomodoro' },
    { id: 3, action: '일일 목표 달성', points: 50, date: '2024-01-15 18:00', type: 'achievement' },
    { id: 4, action: '작업 완료', points: 10, date: '2024-01-15 12:30', type: 'task' },
    { id: 5, action: '연속 3일 목표 달성', points: 100, date: '2024-01-14 23:59', type: 'streak' },
  ];

  const getPointColor = (points: number) => {
    if (points >= 50) return 'text-purple-600';
    if (points >= 25) return 'text-blue-600';
    return 'text-green-600';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'achievement':
      case 'streak':
        return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 'pomodoro':
        return <TrendingUp className="w-4 h-4 text-blue-500" />;
      default:
        return <Calendar className="w-4 h-4 text-green-500" />;
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">포인트 내역</h3>
        <div className="text-sm text-gray-500">총 포인트: 195</div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {pointsHistory.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              {getTypeIcon(entry.type)}
              <div>
                <h4 className="font-medium text-gray-900">{entry.action}</h4>
                <p className="text-sm text-gray-500">{entry.date}</p>
              </div>
            </div>
            <div className={`font-bold ${getPointColor(entry.points)}`}>
              +{entry.points}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">85</div>
            <div className="text-sm text-gray-500">이번 주</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">320</div>
            <div className="text-sm text-gray-500">이번 달</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">1,250</div>
            <div className="text-sm text-gray-500">전체</div>
          </div>
        </div>
      </div>
    </div>
  );
};
