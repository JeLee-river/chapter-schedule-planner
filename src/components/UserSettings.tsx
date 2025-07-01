
import { User, Clock, Bell, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const UserSettings = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center space-x-2 mb-6">
        <User className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-bold text-gray-900">사용자 설정</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            사용자 이름
          </label>
          <Input defaultValue="김사용자" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="w-4 h-4 inline mr-1" />
            작업 분할 단위
          </label>
          <Select defaultValue="25">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15분</SelectItem>
              <SelectItem value="25">25분 (포모도로)</SelectItem>
              <SelectItem value="30">30분</SelectItem>
              <SelectItem value="60">60분</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-700">푸시 알림</span>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Palette className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-700">다크 모드</span>
          </div>
          <Switch />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            위치 알림 반경
          </label>
          <div className="flex items-center space-x-2">
            <Input type="number" defaultValue="100" className="flex-1" />
            <span className="text-sm text-gray-500">미터</span>
          </div>
        </div>

        <Button className="w-full">
          설정 저장
        </Button>
      </div>
    </div>
  );
};
