
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Focus, AlertTriangle } from 'lucide-react';

export const FocusDistractionChart = () => {
  const focusData = [
    { time: '09:00', focus: 85, distractions: 2 },
    { time: '09:30', focus: 90, distractions: 1 },
    { time: '10:00', focus: 95, distractions: 0 },
    { time: '10:30', focus: 75, distractions: 4 },
    { time: '11:00', focus: 80, distractions: 3 },
    { time: '11:30', focus: 88, distractions: 1 },
    { time: '14:00', focus: 60, distractions: 6 },
    { time: '14:30', focus: 70, distractions: 3 },
    { time: '15:00', focus: 85, distractions: 2 },
    { time: '15:30', focus: 92, distractions: 1 },
    { time: '16:00', focus: 78, distractions: 4 },
  ];

  const distractionEvents = [
    { time: '10:30', event: '이메일 알림', type: 'notification' },
    { time: '14:00', event: '점심시간 후 집중력 저하', type: 'natural' },
    { time: '16:00', event: '동료 질문', type: 'interruption' },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center space-x-2 mb-6">
        <Focus className="w-6 h-6 text-green-500" />
        <h2 className="text-2xl font-bold text-gray-900">집중도 & 방해 요소 분석</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 차트 영역 */}
        <div className="lg:col-span-2">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={focusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="focus" orientation="left" domain={[0, 100]} />
                <YAxis yAxisId="distractions" orientation="right" domain={[0, 10]} />
                <Tooltip />
                <Line 
                  yAxisId="focus"
                  type="monotone" 
                  dataKey="focus" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="집중도 (%)"
                />
                <Line 
                  yAxisId="distractions"
                  type="monotone" 
                  dataKey="distractions" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="방해 횟수"
                />
                <ReferenceLine y={80} stroke="#10B981" strokeDasharray="3 3" yAxisId="focus" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 방해 이벤트 목록 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <span>주요 방해 이벤트</span>
          </h3>
          
          <div className="space-y-3">
            {distractionEvents.map((event, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{event.time}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    event.type === 'notification' ? 'bg-blue-100 text-blue-800' :
                    event.type === 'natural' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {event.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{event.event}</p>
              </div>
            ))}
          </div>

          {/* 요약 통계 */}
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-800 mb-2">📈 오늘의 요약</h4>
            <div className="space-y-1 text-sm text-green-700">
              <div>평균 집중도: <span className="font-medium">82%</span></div>
              <div>총 방해 횟수: <span className="font-medium">27회</span></div>
              <div>최고 집중 시간: <span className="font-medium">10:00-10:30</span></div>
              <div>개선 필요 시간: <span className="font-medium">14:00-14:30</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
