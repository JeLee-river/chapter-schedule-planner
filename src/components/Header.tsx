
import { Bell, User, Trophy, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  currentPoints: number;
}

export const Header = ({ currentPoints }: HeaderProps) => {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 및 제목 */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">TaskMaster</h1>
              <p className="text-sm text-gray-500">일정 관리 & 생산성 도구</p>
            </div>
          </div>

          {/* 포인트 및 알림 */}
          <div className="flex items-center space-x-4">
            {/* 현재 포인트 */}
            <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full">
              <Trophy className="w-4 h-4" />
              <span className="font-semibold">{currentPoints}</span>
            </div>

            {/* 알림 버튼 */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </Button>

            {/* 프로필 버튼 */}
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
