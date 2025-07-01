
import { useState } from 'react';
import { Bell, MapPin, Smartphone, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const NotificationSettings = () => {
  const [timeBasedAlerts, setTimeBasedAlerts] = useState(true);
  const [locationAlerts, setLocationAlerts] = useState(false);
  const [appTriggerAlerts, setAppTriggerAlerts] = useState(false);
  const [locationRadius, setLocationRadius] = useState('100');

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center space-x-2 mb-6">
        <Bell className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-bold text-gray-900">알림 설정</h3>
      </div>

      <div className="space-y-6">
        {/* 시간 기반 알림 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-gray-500" />
            <div>
              <h4 className="font-medium text-gray-900">시간 기반 알림</h4>
              <p className="text-sm text-gray-500">D-7, D-3, D-1, 당일 알림</p>
            </div>
          </div>
          <Switch
            checked={timeBasedAlerts}
            onCheckedChange={setTimeBasedAlerts}
          />
        </div>

        {/* 위치 기반 알림 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <div>
                <h4 className="font-medium text-gray-900">위치 기반 알림</h4>
                <p className="text-sm text-gray-500">GPS 위치 진입 시 알림</p>
              </div>
            </div>
            <Switch
              checked={locationAlerts}
              onCheckedChange={setLocationAlerts}
            />
          </div>
          {locationAlerts && (
            <div className="ml-8">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                알림 반경 (미터)
              </label>
              <Input
                type="number"
                value={locationRadius}
                onChange={(e) => setLocationRadius(e.target.value)}
                className="w-32"
              />
            </div>
          )}
        </div>

        {/* 앱 트리거 알림 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Smartphone className="w-5 h-5 text-gray-500" />
            <div>
              <h4 className="font-medium text-gray-900">앱 트리거 알림</h4>
              <p className="text-sm text-gray-500">캘린더/이메일 앱 열람 시</p>
            </div>
          </div>
          <Switch
            checked={appTriggerAlerts}
            onCheckedChange={setAppTriggerAlerts}
          />
        </div>

        {/* 멀티모달 알림 설정 */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
            <Volume2 className="w-5 h-5" />
            <span>알림 방식</span>
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                소리
              </label>
              <Select defaultValue="bell">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bell">벨소리</SelectItem>
                  <SelectItem value="chime">차임</SelectItem>
                  <SelectItem value="notification">알림음</SelectItem>
                  <SelectItem value="none">무음</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                진동
              </label>
              <Select defaultValue="short">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">짧게</SelectItem>
                  <SelectItem value="long">길게</SelectItem>
                  <SelectItem value="pattern">패턴</SelectItem>
                  <SelectItem value="none">끔</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          설정 저장
        </Button>
      </div>
    </div>
  );
};
