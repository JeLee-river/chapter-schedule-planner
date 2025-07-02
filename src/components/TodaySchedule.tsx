import { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { TaskCard } from './TaskCard';
import { Clock, Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AddTaskModal } from './AddTaskModal';

interface Task {
  id: number;
  title: string;
  duration: number;
  timeSlot: string;
  completed: boolean;
  locked: boolean;
  priority: string;
}

interface TodayScheduleProps {
  tasks: Task[];
  onTaskComplete: (taskId: number) => void;
  onTaskUpdate: (tasks: Task[]) => void;
  onAddTask: (task: { title: string; duration: number; timeSlot: string; priority: string }) => void;
}

export const TodaySchedule = ({
  tasks,
  onTaskComplete,
  onTaskUpdate,
  onAddTask,
}: TodayScheduleProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((task) => task.id === active.id);
    const newIndex = tasks.findIndex((task) => task.id === over.id);

    const newTasks = [...tasks];
    const [movedTask] = newTasks.splice(oldIndex, 1);
    newTasks.splice(newIndex, 0, movedTask);

    onTaskUpdate(newTasks);
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className='bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center space-x-3'>
          <Calendar className='w-6 h-6 text-blue-600' />
          <h2 className='text-2xl font-bold text-gray-900'>오늘의 일정</h2>
        </div>
        <div className='flex items-center space-x-2 text-sm text-gray-500'>
          <Clock className='w-4 h-4' />
          <span>현재 시간: {getCurrentTime()}</span>
        </div>
      </div>

      <div className='mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400'>
        <p className='text-sm text-blue-800'>
          💡 <strong>팁:</strong> 작업을 드래그하여 순서를 변경할 수 있습니다.
          RPG 스타일로 이전 작업을 완료해야 다음 작업이 잠금 해제됩니다!
        </p>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className='space-y-4'>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={() => onTaskComplete(task.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Button 
        className='w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
        onClick={() => setIsModalOpen(true)}
      >
        <Plus className='w-4 h-4 mr-2' />새 작업 추가
      </Button>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={onAddTask}
      />
    </div>
  );
};
