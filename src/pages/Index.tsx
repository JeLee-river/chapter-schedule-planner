
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { TodaySchedule } from '@/components/TodaySchedule';
import { PomodoroTimer } from '@/components/PomodoroTimer';
import { ProgressTracker } from '@/components/ProgressTracker';
import { RewardSystem } from '@/components/RewardSystem';
import { StatsReport } from '@/components/StatsReport';
import { TaskManager } from '@/components/TaskManager';

const Index = () => {
  const [currentPoints, setCurrentPoints] = useState(120);
  const [todayTasks, setTodayTasks] = useState([
    { id: 1, title: '아침 운동', duration: 30, timeSlot: '07:00', completed: false, locked: false },
    { id: 2, title: '프로젝트 기획서 작성', duration: 60, timeSlot: '09:00', completed: false, locked: false },
    { id: 3, title: '클라이언트 미팅', duration: 45, timeSlot: '14:00', completed: false, locked: true },
    { id: 4, title: '코드 리뷰', duration: 30, timeSlot: '16:00', completed: false, locked: true },
  ]);

  const handleTaskComplete = (taskId: number) => {
    setTodayTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        // 현재 작업 완료
        const updatedTask = { ...task, completed: true };
        
        // 다음 작업 잠금 해제 (RPG 스타일)
        const nextTaskIndex = prev.findIndex(t => t.id === taskId) + 1;
        if (nextTaskIndex < prev.length) {
          prev[nextTaskIndex].locked = false;
        }
        
        // 휴식 포인트 획득
        setCurrentPoints(points => points + 10);
        
        return updatedTask;
      }
      return task;
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header currentPoints={currentPoints} />
      
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* 오늘의 주요 메트릭스 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">오늘의 진행률</h3>
            <div className="text-3xl font-bold text-blue-600">
              {Math.round((todayTasks.filter(t => t.completed).length / todayTasks.length) * 100)}%
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">완료된 작업</h3>
            <div className="text-3xl font-bold text-green-600">
              {todayTasks.filter(t => t.completed).length}/{todayTasks.length}
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">집중 세션</h3>
            <div className="text-3xl font-bold text-purple-600">3</div>
          </div>
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 왼쪽: 오늘 일정 및 작업 관리 */}
          <div className="lg:col-span-2 space-y-6">
            <TodaySchedule 
              tasks={todayTasks} 
              onTaskComplete={handleTaskComplete}
              onTaskUpdate={setTodayTasks}
            />
            <TaskManager />
          </div>
          
          {/* 오른쪽: 사이드바 */}
          <div className="space-y-6">
            <PomodoroTimer />
            <ProgressTracker tasks={todayTasks} />
            <RewardSystem currentPoints={currentPoints} />
          </div>
        </div>

        {/* 하단: 통계 및 리포트 */}
        <StatsReport />
      </div>
    </div>
  );
};

export default Index;
