
import { TrendingUp, Target, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Task {
  id: number;
  title: string;
  duration: number;
  timeSlot: string;
  completed: boolean;
  locked: boolean;
}

interface ProgressTrackerProps {
  tasks: Task[];
}

export const ProgressTracker = ({ tasks }: ProgressTrackerProps) => {
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  const unlockedTasks = tasks.filter(t => !t.locked).length;
  const levelProgress = Math.min((completedTasks / totalTasks) * 100, 100);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-bold text-gray-900">진행도 추적</h3>
      </div>

      {/* 일일 목표 달성률 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">일일 목표</span>
          <span className="text-sm text-gray-600">{completedTasks}/{totalTasks}</span>
        </div>
        <Progress value={progressPercentage} className="mb-2" />
        <p className="text-xs text-gray-500">
          {progressPercentage >= 100 ? '🎉 오늘 목표를 달성했습니다!' : `${Math.round(100 - progressPercentage)}% 남았습니다`}
        </p>
      </div>

      {/* RPG 레벨 시스템 */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Award className="w-5 h-5 text-purple-500" />
          <span className="text-sm font-medium text-gray-700">레벨 진행도</span>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${levelProgress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>레벨 3</span>
          <span>{Math.round(levelProgress)}%</span>
          <span>레벨 4</span>
        </div>
      </div>

      {/* 잠금 해제 현황 */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-green-500" />
          <span className="text-sm font-medium text-gray-700">잠금 해제 현황</span>
        </div>
        
        <div className="text-sm text-gray-600">
          <div className="flex justify-between">
            <span>해제된 작업:</span>
            <span className="font-medium text-green-600">{unlockedTasks}/{totalTasks}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>다음 해제까지:</span>
            <span className="font-medium text-blue-600">
              {unlockedTasks < totalTasks ? '1개 완료 필요' : '모두 해제됨'}
            </span>
          </div>
        </div>

        {/* 성취 배지 */}
        <div className="pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">오늘의 성취</p>
          <div className="flex space-x-2">
            {completedTasks >= 1 && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                🚀 시작
              </span>
            )}
            {completedTasks >= totalTasks / 2 && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                🎯 중간 달성
              </span>
            )}
            {completedTasks === totalTasks && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                👑 완벽한 하루
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
