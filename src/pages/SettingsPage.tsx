
import { UserSettings } from '@/components/UserSettings';
import { SystemSettings } from '@/components/SystemSettings';

const SettingsPage = () => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">설정</h1>
        <p className="text-gray-600">개인 설정 및 시스템 환경을 구성하세요</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UserSettings />
        <SystemSettings />
      </div>
    </div>
  );
};

export default SettingsPage;
