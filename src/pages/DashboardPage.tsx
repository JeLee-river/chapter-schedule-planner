import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  useDraggable,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { TodaySchedule } from '@/components/TodaySchedule';
import { TaskManager } from '@/components/TaskManager';

import { DroppableArea } from '@/components/DroppableArea';
import { TaskCard } from '@/components/TaskCard';
import { useLocationNotification } from '@/hooks/useLocationNotification';
import { useTimeNotification } from '@/hooks/useTimeNotification';

const initialTasks = [
  {
    id: 1,
    title: '프로젝트 기획',
    duration: 60,
    timeSlot: '',
    completed: false,
    locked: false,
    priority: 'high',
    notificationType: 'none' as const,
    tags: [],
    pomodoroTimeLeft: 25 * 60,
    pomodoroIsRunning: false,
    pomodoroIsBreak: false,
    pomodoroSessions: 0,
    pomodoroActive: false,
  },
  {
    id: 2,
    title: '코드 리뷰',
    duration: 30,
    timeSlot: '',
    completed: false,
    locked: false,
    priority: 'medium',
    notificationType: 'none' as const,
    tags: [],
    pomodoroTimeLeft: 25 * 60,
    pomodoroIsRunning: false,
    pomodoroIsBreak: false,
    pomodoroSessions: 0,
    pomodoroActive: false,
  },
  {
    id: 3,
    title: '문서 작성',
    duration: 45,
    timeSlot: '',
    completed: false,
    locked: false,
    priority: 'low',
    notificationType: 'none' as const,
    tags: [],
    pomodoroTimeLeft: 25 * 60,
    pomodoroIsRunning: false,
    pomodoroIsBreak: false,
    pomodoroSessions: 0,
    pomodoroActive: false,
  },
];

const DashboardPage = () => {
  const [unstartedTasks, setUnstartedTasks] = useState(initialTasks);
  const [startedTasks, setStartedTasks] = useState([]);

  const allTasks = [...unstartedTasks, ...startedTasks];
  useLocationNotification(allTasks);
  useTimeNotification(allTasks);

  const handleTaskComplete = (taskId: number | string) => {
    
    
    const newTasks = startedTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    let previousTaskCompleted = true;
    newTasks.forEach((task) => {
      task.locked = !previousTaskCompleted;
      previousTaskCompleted = task.completed;
    });

    setStartedTasks(newTasks);
  };

  const handleTaskUpdate = (updatedTasks: any[]) => {
    setStartedTasks(updatedTasks);
  };

  const handleAddTask = (newTask: {
    title: string;
    duration: number;
    priority: string;
  }) => {
    setUnstartedTasks((prevTasks) => [
      ...prevTasks,
      {
        id:
          (prevTasks.length > 0
            ? Math.max(...prevTasks.map((task) => Number(task.id)))
            : 0) +
          (startedTasks.length > 0
            ? Math.max(...startedTasks.map((task) => Number(task.id)))
            : 0) +
          1,
        ...newTask,
        timeSlot: '',
        completed: false,
        locked: false,
        notificationType: 'none' as const,
        tags: [],
        pomodoroTimeLeft: 25 * 60,
        pomodoroIsRunning: false,
        pomodoroIsBreak: false,
        pomodoroSessions: 0,
        pomodoroActive: false,
      },
    ]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const findTask = (id) =>
      unstartedTasks.find((t) => t.id === id) ||
      startedTasks.find((t) => t.id === id);
    const activeTask = findTask(activeId);

    if (!activeTask) return;

    const isOverUnstarted = overId === 'unstarted-tasks';
    const isOverStarted = over.id.toString().startsWith('time-slot-');

    const sourceListId = unstartedTasks.some((t) => t.id === activeId)
      ? 'unstarted'
      : 'started';

    

    if (overId === 'started-tasks' || over.id.toString().startsWith('time-slot-')) {
      // From unstarted to started, or reordering within started
      let newTimeSlot = '';
      if (over.id.toString().startsWith('time-slot-')) {
        newTimeSlot = (over.data.current as { time: string }).time;
      }

      if (sourceListId === 'unstarted') {
        setUnstartedTasks(unstartedTasks.filter((t) => t.id !== activeId));
        setStartedTasks([
          ...startedTasks,
          { ...activeTask, timeSlot: newTimeSlot, pomodoroTimeLeft: 25 * 60, pomodoroIsRunning: false, pomodoroIsBreak: false, pomodoroSessions: 0, pomodoroActive: false },
        ]);
      } else if (overId === 'started-tasks') {
        // Reordering within started tasks is handled by TodaySchedule
      }
    } else if (overId === 'unstarted-tasks') {
      // From started to unstarted
      if (sourceListId === 'started') {
        setStartedTasks(startedTasks.filter((t) => t.id !== activeId));
        setUnstartedTasks([...unstartedTasks, { ...activeTask, timeSlot: '' }]);
      } else {
        // Reorder within unstarted tasks
        const oldIndex = unstartedTasks.findIndex((t) => t.id === activeId);
        const newIndex = unstartedTasks.length; // Drop at the end
        setUnstartedTasks(arrayMove(unstartedTasks, oldIndex, newIndex));
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <TodaySchedule
            tasks={startedTasks}
            onTaskComplete={handleTaskComplete}
            onTaskUpdate={handleTaskUpdate}
            onAddTask={handleAddTask}
          />
        </div>
        <div className="space-y-4">
          <DroppableArea id="unstarted-tasks" title="시작 전 일정">
            <SortableContext
              items={unstartedTasks.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {unstartedTasks.map((task) => (
                  <DraggableTaskCard key={task.id} task={task} onTaskComplete={handleTaskComplete} />
                ))}
              </div>
            </SortableContext>
          </DroppableArea>
          <TaskManager
            onAddTask={handleAddTask}
          />
          
        </div>
      </div>
    </DndContext>
  );
};

const DraggableTaskCard = ({ task, onTaskComplete }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: task,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} onComplete={() => onTaskComplete(task.id)} isDragging={isDragging} />
    </div>
  );
};

export default DashboardPage;
