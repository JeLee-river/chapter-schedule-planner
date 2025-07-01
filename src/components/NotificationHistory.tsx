
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const NotificationHistory = () => {
  const notifications = [
    {
      id: 1,
      type: 'time-based',
      title: '프로젝트 미팅',
      message: '내일 오후 2시 프로젝트 미팅이 있습니다',
      time: '2024-01-15 15:30',
      status: 'responded',
      response_time: '2분'
    },
    {
      id: 2,
      type: 'location',
      title: '사무실 도착',
      message: '사무실 근처에 도착했습니다. 오늘 할 일을 확인하세요',
      time: '2024-01-15 09:15',
      status: 'ignored',
      response_time: '-'
    },
    {
      id: 3,
      type: 'pomodoro',
      title: '집중 세션 완료',
      message: '25분 집중 세션이 완료되었습니다. 휴식하세요!',
      time: '2024-01-15 11:00',
      status: 'responded',
      response_time: '즉시'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'responded':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'ignored':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'time-based':
        return 'bg-blue-100 text-blue-800';
      case 'location':
        return 'bg-green-100 text-green-800';
      case 'pomodoro':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="w-6 h-6 text-gray-500" />
        <h3 className="text-xl font-bold text-gray-900">알림 기록</h3>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-gray-900">{notification.title}</h4>
              <div className="flex items-center space-x-2">
                {getStatusIcon(notification.status)}
                <Badge className={getTypeColor(notification.type)}>
                  {notification.type}
                </Badge>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{notification.time}</span>
              <span>응답시간: {notification.response_time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">📊 알림 통계</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-blue-600">응답률:</span>
            <span className="font-medium ml-1">67%</span>
          </div>
          <div>
            <span className="text-blue-600">평균 응답시간:</span>
            <span className="font-medium ml-1">1.5분</span>
          </div>
        </div>
      </div>
    </div>
  );
};
