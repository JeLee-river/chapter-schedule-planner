
import { useState } from 'react';
import { TodaySchedule } from '@/components/TodaySchedule';
import { TaskManager } from '@/components/TaskManager';

interface Task {
  id: number;
  title: string;
  duration: number;
  timeSlot: string;
  completed: boolean;
  locked: boolean;
}

const TodaySchedulePage = () => {
  const [todayTasks, setTodayTasks] = useState<Task[]>([
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

  const handleAddTask = (newTask: { title: string; duration: number; priority: string }) => {
    const nextId = Math.max(...todayTasks.map(t => t.id)) + 1;
    const nextTimeSlot = generateNextTimeSlot();
    
    const task: Task = {
      id: nextId,
      title: newTask.title,
      duration: newTask.duration,
      timeSlot: nextTimeSlot,
      completed: false,
      locked: todayTasks.length > 0 && !todayTasks[todayTasks.length - 1].completed
    };

    setTodayTasks(prev => [...prev, task]);
  };

  const generateNextTimeSlot = (): string => {
    if (todayTasks.length === 0) return '09:00';
    
    const lastTask = todayTasks[todayTasks.length - 1];
    const [hours, minutes] = lastTask.timeSlot.split(':').map(Number);
    const lastTaskEnd = new Date();
    lastTaskEnd.setHours(hours, minutes + lastTask.duration);
    
    return lastTaskEnd.toTimeString().slice(0, 5);
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
          <TaskManager onAddTask={handleAddTask} />
        </div>
      </div>
    </div>
  );
};

export default TodaySchedulePage;
