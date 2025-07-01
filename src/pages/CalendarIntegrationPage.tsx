
import { CalendarSync } from '@/components/CalendarSync';
import { ExternalCalendars } from '@/components/ExternalCalendars';

const CalendarIntegrationPage = () => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">캘린더 연동</h1>
        <p className="text-gray-600">외부 캘린더와 동기화하여 일정을 통합 관리하세요</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CalendarSync />
        <ExternalCalendars />
      </div>
    </div>
  );
};

export default CalendarIntegrationPage;
