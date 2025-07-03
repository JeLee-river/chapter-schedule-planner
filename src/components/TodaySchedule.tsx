import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable';
import { TaskCard } from './TaskCard';
import { Clock, Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AddTaskModal } from './AddTaskModal';
import { cn } from '@/lib/utils';

interface Task {
  id: number | string;
  title: string;
  duration: number;
  timeSlot: string;
  completed: boolean;
  locked: boolean;
  priority: string;
}

interface TodayScheduleProps {
  tasks: Task[];
  onTaskComplete: (taskId: number | string) => void;
  onTaskUpdate: (tasks: Task[]) => void;
  onAddTask: (task: {
    title: string;
    duration: number;
    priority: string;
  }) => void;
}

const SortableTaskCard = ({ task, onTaskComplete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} onComplete={() => onTaskComplete(task.id)} />
    </div>
  );
};


export const TodaySchedule = ({
  tasks,
  onTaskComplete,
  onTaskUpdate,
  onAddTask,
}: TodayScheduleProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  );

  const { setNodeRef, isOver } = useDroppable({ id: 'started-tasks' });


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((t) => t.id === active.id);
      const newIndex = tasks.findIndex((t) => t.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        onTaskUpdate(arrayMove(tasks, oldIndex, newIndex));
      }
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Calendar className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">오늘 시작한 일정</h2>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>현재 시간: {currentTime}</span>
        </div>
      </div>

      

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div
          ref={setNodeRef}
          className={cn(
            'p-4 rounded-lg min-h-[200px] transition-colors duration-200',
            isOver ? 'bg-green-100' : 'bg-gray-50'
          )}
        >
          <SortableContext
            items={tasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <SortableTaskCard
                    key={task.id}
                    task={task}
                    onTaskComplete={onTaskComplete}
                  />
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">
                    '시작 전 일정' 목록에서 작업을 드래그하여 이곳에 놓아
                    일정을 시작하세요.
                  </p>
                </div>
              )}
            </div>
          </SortableContext>
        </div>
      </DndContext>

      <Button
        className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus className="w-4 h-4 mr-2" />새 작업 추가
      </Button>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={onAddTask}
      />
    </div>
  );
};
