
import { Calendar, Plus, Settings, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const ExternalCalendars = () => {
  const calendars = [
    {
      id: 1,
      name: 'Google Calendar',
      type: 'google',
      color: '#4285f4',
      visible: true,
      events: 15
    },
    {
      id: 2,
      name: '업무 캘린더',
      type: 'outlook',
      color: '#0078d4',
      visible: true,
      events: 8
    },
    {
      id: 3,
      name: '개인 일정',
      type: 'apple',
      color: '#34c759',
      visible: false,
      events: 5
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-6 h-6 text-purple-500" />
          <h3 className="text-xl font-bold text-gray-900">외부 캘린더</h3>
        </div>
        <Button size="sm" className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>캘린더 추가</span>
        </Button>
      </div>

      <div className="space-y-3">
        {calendars.map((calendar) => (
          <div 
            key={calendar.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: calendar.color }}
              />
              <div>
                <h4 className="font-medium text-gray-900">{calendar.name}</h4>
                <p className="text-sm text-gray-500">{calendar.events}개 일정</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant={calendar.type === 'google' ? 'default' : 'secondary'}>
                {calendar.type}
              </Badge>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                {calendar.visible ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
        <h4 className="font-medium text-purple-800 mb-2">💡 팁</h4>
        <p className="text-sm text-purple-700">
          여러 캘린더를 연동하여 모든 일정을 한 곳에서 관리하세요. 
          각 캘린더의 표시/숨김을 조절할 수 있습니다.
        </p>
      </div>
    </div>
  );
};
