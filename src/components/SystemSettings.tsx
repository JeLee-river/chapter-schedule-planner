
import { Settings, Database, Shield, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

export const SystemSettings = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="w-6 h-6 text-gray-500" />
        <h3 className="text-xl font-bold text-gray-900">시스템 설정</h3>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Database className="w-5 h-5 text-gray-500" />
            <div>
              <h4 className="font-medium text-gray-900">데이터 백업</h4>
              <p className="text-sm text-gray-500">자동 백업 활성화</p>
            </div>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-gray-500" />
            <div>
              <h4 className="font-medium text-gray-900">개인정보 보호</h4>
              <p className="text-sm text-gray-500">익명 사용 통계</p>
            </div>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Smartphone className="w-5 h-5 text-gray-500" />
            <div>
              <h4 className="font-medium text-gray-900">앱 권한</h4>
              <p className="text-sm text-gray-500">위치, 알림, 캘린더 접근</p>
            </div>
          </div>
          <Badge variant="outline">설정됨</Badge>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">저장소 사용량</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">사용된 공간</span>
              <span className="font-medium">2.3 MB / 50 MB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '4.6%' }}></div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button variant="outline" className="flex-1">
            데이터베이스 초기화
          </Button>
          <Button variant="outline" className="flex-1">
            캐시 삭제
          </Button>
        </div>
      </div>
    </div>
  );
};
