
import { useState } from 'react';
import { Calendar, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export const CalendarSync = () => {
  const [googleSyncEnabled, setGoogleSyncEnabled] = useState(false);
  const [lastSync, setLastSync] = useState('2024-01-15 14:30');
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

  const handleSync = () => {
    setSyncStatus('syncing');
    // Simulate sync process
    setTimeout(() => {
      setSyncStatus('success');
      setLastSync(new Date().toLocaleString());
      setTimeout(() => setSyncStatus('idle'), 2000);
    }, 2000);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center space-x-2 mb-6">
        <Calendar className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-bold text-gray-900">캘린더 동기화</h3>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Google Calendar 연동</h4>
            <p className="text-sm text-gray-500">Google Calendar와 자동 동기화</p>
          </div>
          <Switch
            checked={googleSyncEnabled}
            onCheckedChange={setGoogleSyncEnabled}
          />
        </div>

        {googleSyncEnabled && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">마지막 동기화</span>
              <span className="text-sm font-medium">{lastSync}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Button 
                onClick={handleSync}
                disabled={syncStatus === 'syncing'}
                className="flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
                <span>
                  {syncStatus === 'syncing' ? '동기화 중...' : '지금 동기화'}
                </span>
              </Button>

              {syncStatus === 'success' && (
                <div className="flex items-center space-x-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">완료</span>
                </div>
              )}

              {syncStatus === 'error' && (
                <div className="flex items-center space-x-1 text-red-600">
                  <XCircle className="w-4 h-4" />
                  <span className="text-sm">오류</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">📊 동기화 통계</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-600">가져온 일정:</span>
              <span className="font-medium ml-1">24개</span>
            </div>
            <div>
              <span className="text-blue-600">내보낸 일정:</span>
              <span className="font-medium ml-1">12개</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
