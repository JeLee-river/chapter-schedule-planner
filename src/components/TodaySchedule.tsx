

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
import { PomodoroTimer } from './PomodoroTimer'; // PomodoroTimer 임포트

interface Task {
  id: number | string;
  title: string;
  duration: number;
  timeSlot: string;
  completed: boolean;
  locked: boolean;
  priority: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  notificationType: 'time' | 'location' | 'none';
  dueDate?: string;
  tags?: string[];
  pomodoroTimeLeft: number; // 남은 시간 (초)
  pomodoroIsRunning: boolean; // 타이머 실행 여부
  pomodoroIsBreak: boolean; // 휴식 시간 여부
  pomodoroSessions: number; // 완료된 포모도로 세션 수
  pomodoroActive: boolean; // 포모도로 타이머 활성화 여부 (시작 버튼 클릭 시 true)
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

const SortableTaskCard = ({ task, onTaskComplete, onStartTimer }) => { // onStartTimer prop 추가
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <TaskCard task={task} onComplete={onTaskComplete} onStartTimer={onStartTimer} attributes={attributes} listeners={listeners} />
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

  const handleStartTimer = (taskId: number | string) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId
        ? { 
            ...task,
            pomodoroActive: !task.pomodoroActive, // pomodoroActive 토글
            pomodoroIsRunning: !task.pomodoroActive ? true : false, // pomodoroActive가 true가 되면 isRunning도 true로, 아니면 false
          }
        : task
    );
    onTaskUpdate(updatedTasks);
  };

  const handlePomodoroUpdate = (taskId: number | string, newTimeLeft: number, newIsRunning: boolean, newIsBreak: boolean, newSessions: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId
        ? { 
            ...task,
            pomodoroTimeLeft: newTimeLeft,
            pomodoroIsRunning: newIsRunning,
            pomodoroIsBreak: newIsBreak,
            pomodoroSessions: newSessions,
          }
        : task
    );
    onTaskUpdate(updatedTasks);
  };

  const handlePomodoroCompleteSession = (taskId: number | string, newSessions: number, newIsBreak: boolean, newTimeLeft: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId
        ? { 
            ...task,
            pomodoroSessions: newSessions,
            pomodoroIsBreak: newIsBreak,
            pomodoroTimeLeft: newTimeLeft,
            pomodoroIsRunning: false, // 세션 완료 시 타이머 중지
          }
        : task
    );
    onTaskUpdate(updatedTasks);
  };

  const handlePomodoroReset = (taskId: number | string, initialTime: number, initialIsBreak: boolean) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId
        ? { 
            ...task,
            pomodoroTimeLeft: initialTime,
            pomodoroIsRunning: false,
            pomodoroIsBreak: initialIsBreak,
          }
        : task
    );
    onTaskUpdate(updatedTasks);
  };

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
                  <div key={task.id}>
                    <SortableTaskCard
                      task={task}
                      onTaskComplete={() => onTaskComplete(task.id)}
                      onStartTimer={handleStartTimer}
                    />
                    {task.pomodoroActive && (
                      <div className="mt-4">
                        <PomodoroTimer
                          taskId={task.id}
                          taskTitle={task.title}
                          timeLeft={task.pomodoroTimeLeft}
                          isRunning={task.pomodoroIsRunning}
                          isBreak={task.pomodoroIsBreak}
                          sessions={task.pomodoroSessions}
                          onTimeLeftChange={(newTime) => handlePomodoroUpdate(task.id, newTime, task.pomodoroIsRunning, task.pomodoroIsBreak, task.pomodoroSessions)}
                          onIsRunningChange={(newIsRunning) => handlePomodoroUpdate(task.id, task.pomodoroTimeLeft, newIsRunning, task.pomodoroIsBreak, task.pomodoroSessions)}
                          onIsBreakChange={(newIsBreak) => handlePomodoroUpdate(task.id, task.pomodoroTimeLeft, task.pomodoroIsRunning, newIsBreak, task.pomodoroSessions)}
                          onSessionsChange={(newSessions) => handlePomodoroUpdate(task.id, task.pomodoroTimeLeft, task.pomodoroIsRunning, task.pomodoroIsBreak, newSessions)}
                          onCompleteSession={(newSessions, newIsBreak, newTimeLeft) => handlePomodoroCompleteSession(task.id, newSessions, newIsBreak, newTimeLeft)}
                          onResetTimer={(initialTime, initialIsBreak) => handlePomodoroReset(task.id, initialTime, initialIsBreak)}
                        />
                      </div>
                    )}
                  </div>
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
    </div>
  );
};
