import { useState } from 'react';
import { TodaySchedule } from '@/components/TodaySchedule';
import { TaskManager } from '@/components/TaskManager';
import { PomodoroTimer } from '@/components/PomodoroTimer';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: '프로젝트 기획', duration: 60, timeSlot: '09:00', completed: false, locked: false, priority: 'high' },
    { id: 2, title: '코드 리뷰', duration: 30, timeSlot: '10:00', completed: false, locked: false, priority: 'medium' },
    { id: 3, title: '문서 작성', duration: 45, timeSlot: '11:00', completed: false, locked: false, priority: 'low' },
  ]);

  const handleTaskComplete = (taskId: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleTaskUpdate = (newTasks: any[]) => {
    setTasks(newTasks);
  };

  const handleAddTask = (newTask: { title: string; duration: number; timeSlot: string; priority: string }) => {
    setTasks(prevTasks => [
      ...prevTasks,
      {
        id: prevTasks.length > 0 ? Math.max(...prevTasks.map(task => task.id)) + 1 : 1,
        ...newTask,
        completed: false,
        locked: false,
      },
    ]);
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
      <div className='lg:col-span-2'>
        <TodaySchedule 
          tasks={tasks} 
          onTaskComplete={handleTaskComplete} 
          onTaskUpdate={handleTaskUpdate}
          onAddTask={handleAddTask}
        />
      </div>
      <div>
        <TaskManager onAddTask={handleAddTask} />
        <PomodoroTimer />
      </div>
    </div>
  );
};

export default DashboardPage;
