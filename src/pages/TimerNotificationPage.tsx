
import { PomodoroTimer } from '@/components/PomodoroTimer';
import { NotificationSettings } from '@/components/NotificationSettings';
import { NotificationHistory } from '@/components/NotificationHistory';

const TimerNotificationPage = () => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">타이머 & 알림</h1>
        <p className="text-gray-600">포모도로 타이머와 스마트 알림을 관리하세요</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <PomodoroTimer />
          <NotificationSettings />
        </div>
        
        <div>
          <NotificationHistory />
        </div>
      </div>
    </div>
  );
};

export default TimerNotificationPage;
