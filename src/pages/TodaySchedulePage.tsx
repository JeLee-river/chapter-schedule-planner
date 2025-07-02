
import { useState } from 'react';
import { TodaySchedule } from '@/components/TodaySchedule';
import { TaskManager } from '@/components/TaskManager';
import { useToast } from '@/hooks/use-toast';

interface Task {
  id: number;
  title: string;
  duration: number;
  timeSlot: string;
  completed: boolean;
  locked: boolean;
  priority: string;
}

const TodaySchedulePage = () => {
  const [todayTasks, setTodayTasks] = useState<Task[]>([
    { id: 1, title: '아침 운동', duration: 30, timeSlot: '07:00', completed: false, locked: false, priority: 'medium' },
    { id: 2, title: '프로젝트 기획서 작성', duration: 60, timeSlot: '09:00', completed: false, locked: true, priority: 'high' },
    { id: 3, title: '클라이언트 미팅', duration: 45, timeSlot: '14:00', completed: false, locked: true, priority: 'high' },
    { id: 4, title: '코드 리뷰', duration: 30, timeSlot: '16:00', completed: false, locked: true, priority: 'medium' },
  ]);
  const [currentPoints, setCurrentPoints] = useState(120);
  const { toast } = useToast();

  const handleTaskComplete = (taskId: number) => {
    setTodayTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, completed: true };
        
        // 다음 작업 잠금 해제 (RPG 스타일)
        const currentIndex = prev.findIndex(t => t.id === taskId);
        if (currentIndex < prev.length - 1) {
          prev[currentIndex + 1].locked = false;
        }
        
        // 포인트 적립
        const points = task.priority === 'high' ? 15 : task.priority === 'medium' ? 10 : 5;
        setCurrentPoints(current => current + points);
        
        toast({
          title: "작업 완료! 🎉",
          description: `"${task.title}"을(를) 완료했습니다. +${points} 휴식 포인트를 획득했습니다!`,
        });
        
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
      locked: todayTasks.length > 0 && !isLastTaskCompleted(),
      priority: newTask.priority
    };

    setTodayTasks(prev => [...prev, task]);
    
    toast({
      title: "작업이 추가되었습니다",
      description: `"${newTask.title}"이(가) ${nextTimeSlot}에 추가되었습니다.`,
    });
  };

  const isLastTaskCompleted = (): boolean => {
    if (todayTasks.length === 0) return true;
    const lastTask = todayTasks[todayTasks.length - 1];
    return lastTask.completed;
  };

  const generateNextTimeSlot = (): string => {
    if (todayTasks.length === 0) return '09:00';
    
    const lastTask = todayTasks[todayTasks.length - 1];
    const [hours, minutes] = lastTask.timeSlot.split(':').map(Number);
    const endTime = new Date();
    endTime.setHours(hours, minutes + lastTask.duration);
    
    // 정시 또는 30분 단위로 반올림
    const newMinutes = endTime.getMinutes();
    if (newMinutes > 0 && newMinutes < 30) {
      endTime.setMinutes(30);
    } else if (newMinutes > 30) {
      endTime.setHours(endTime.getHours() + 1);
      endTime.setMinutes(0);
    }
    
    return endTime.toTimeString().slice(0, 5);
  };

  const handleTaskUpdate = (updatedTasks: Task[]) => {
    setTodayTasks(updatedTasks);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">오늘의 일정</h1>
        <p className="text-gray-600">RPG 스타일로 단계별 작업을 완료해보세요</p>
        <div className="mt-2 flex items-center space-x-4">
          <div className="text-sm text-blue-600 font-medium">
            💰 현재 포인트: {currentPoints}
          </div>
          <div className="text-sm text-green-600">
            ⭐ 완료율: {Math.round((todayTasks.filter(t => t.completed).length / todayTasks.length) * 100) || 0}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TodaySchedule 
            tasks={todayTasks} 
            onTaskComplete={handleTaskComplete}
            onTaskUpdate={handleTaskUpdate}
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
