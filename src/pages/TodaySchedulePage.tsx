
import { useState } from 'react';
import { TodaySchedule } from '@/components/TodaySchedule';
import { TaskManager } from '@/components/TaskManager';

const TodaySchedulePage = () => {
  const [todayTasks, setTodayTasks] = useState([
    { id: 1, title: '아침 운동', duration: 30, timeSlot: '07:00', completed: false, locked: false },
    { id: 2, title: '프로젝트 기획서 작성', duration: 60, timeSlot: '09:00', completed: false, locked: false },
    { id: 3, title: '클라이언트 미팅', duration: 45, timeSlot: '14:00', completed: false, locked: true },
    { id: 4, title: '코드 리뷰', duration: 30, timeSlot: '16:00', completed: false, locked: true },
  ]);

  const handleTaskComplete = (taskId: number) => {
    setTodayTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, completed: true };
        
        const nextTaskIndex = prev.findIndex(t => t.id === taskId) + 1;
        if (nextTaskIndex < prev.length) {
          prev[nextTaskIndex].locked = false;
        }
        
        return updatedTask;
      }
      return task;
    }));
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">오늘의 일정</h1>
        <p className="text-gray-600">RPG 스타일로 단계별 작업을 완료해보세요</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TodaySchedule 
            tasks={todayTasks} 
            onTaskComplete={handleTaskComplete}
            onTaskUpdate={setTodayTasks}
          />
        </div>
        
        <div>
          <TaskManager />
        </div>
      </div>
    </div>
  );
};

export default TodaySchedulePage;
