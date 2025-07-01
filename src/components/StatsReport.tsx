
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Activity, TrendingUp, Clock, Target } from 'lucide-react';

export const StatsReport = () => {
  const weeklyData = [
    { day: '월', completed: 6, planned: 8, focusTime: 120 },
    { day: '화', completed: 8, planned: 8, focusTime: 180 },
    { day: '수', completed: 5, planned: 7, focusTime: 90 },
    { day: '목', completed: 7, planned: 8, focusTime: 150 },
    { day: '금', completed: 9, planned: 10, focusTime: 200 },
    { day: '토', completed: 4, planned: 5, focusTime: 80 },
    { day: '일', completed: 3, planned: 4, focusTime: 60 },
  ];

  const focusTimeData = [
    { time: '09:00', focus: 85 },
    { time: '10:00', focus: 95 },
    { time: '11:00', focus: 75 },
    { time: '14:00', focus: 60 },
    { time: '15:00', focus: 80 },
    { time: '16:00', focus: 90 },
    { time: '17:00', focus: 70 },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center space-x-2 mb-6">
        <Activity className="w-6 h-6 text-indigo-500" />
        <h2 className="text-2xl font-bold text-gray-900">주간 통계 리포트</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">이번 주 달성률</span>
          </div>
          <div className="text-2xl font-bold text-blue-900">87%</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">총 집중 시간</span>
          </div>
          <div className="text-2xl font-bold text-green-900">12.2시간</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">완료한 작업</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">42개</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">포모도로 세션</span>
          </div>
          <div className="text-2xl font-bold text-orange-900">28회</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 주간 작업 완료 차트 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">주간 작업 완료 현황</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#3B82F6" name="완료" />
                <Bar dataKey="planned" fill="#E5E7EB" name="계획" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 시간대별 집중도 차트 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">시간대별 집중도</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={focusTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="focus" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  name="집중도 (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI 인사이트 */}
      <div className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
        <h4 className="font-semibold text-indigo-800 mb-2">🤖 AI 인사이트</h4>
        <ul className="text-sm text-indigo-700 space-y-1">
          <li>• 오전 10-11시에 가장 높은 집중도를 보입니다</li>
          <li>• 금요일에 가장 생산적인 패턴을 보입니다</li>
          <li>• 주말 휴식 후 월요일 집중도가 향상됩니다</li>
          <li>• 15분 단위 작업 분할이 효과적입니다</li>
        </ul>
      </div>
    </div>
  );
};
