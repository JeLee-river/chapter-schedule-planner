import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Activity, TrendingUp, Clock, Target } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface StatsReportProps {
  weeklyData: any[];
  focusTimeData: any[];
  stats: {
    achievementRate: number;
    totalFocusTime: string;
    completedTasks: number;
    pomodoroSessions: number;
  };
  aiInsights: string[];
}

export const StatsReport = ({ weeklyData, focusTimeData, stats, aiInsights }: StatsReportProps) => {
  const [selectedDay, setSelectedDay] = useState<any>(null);

  const handleBarClick = (data: any) => {
    setSelectedDay(data.activePayload[0].payload);
  };

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
          <div className="text-2xl font-bold text-blue-900">{stats.achievementRate}%</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">총 집중 시간</span>
          </div>
          <div className="text-2xl font-bold text-green-900">{stats.totalFocusTime}</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">완료한 작업</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">{stats.completedTasks}개</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">포모도로 세션</span>
          </div>
          <div className="text-2xl font-bold text-orange-900">{stats.pomodoroSessions}회</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 주간 작업 완료 차트 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">주간 작업 완료 현황</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} onClick={handleBarClick}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#3B82F6" name="완료" cursor="pointer" />
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
          {aiInsights.map((insight, index) => (
            <li key={index}>• {insight}</li>
          ))}
        </ul>
      </div>

      <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedDay?.day}요일 상세 내역</DialogTitle>
          </DialogHeader>
          {selectedDay && (
            <div>
              <p><strong>계획된 작업:</strong> {selectedDay.planned}개</p>
              <p><strong>완료된 작업:</strong> {selectedDay.completed}개</p>
              <p><strong>집중 시간:</strong> {selectedDay.focusTime}분</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};