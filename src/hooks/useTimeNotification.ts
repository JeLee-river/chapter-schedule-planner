import { useEffect, useRef } from 'react';

interface Task {
  id: number | string;
  title: string;
  completed: boolean;
  notificationType: 'time' | 'location' | 'none';
  dueDate?: string;
}

export const useTimeNotification = (tasks: Task[]) => {
  const notifiedTasks = useRef<Set<string>>(new Set());

  useEffect(() => {
    const checkDueDate = () => {
      const now = new Date();
      tasks.forEach((task) => {
        if (task.notificationType === 'time' && task.dueDate && !task.completed) {
          const dueDate = new Date(task.dueDate);
          const diffTime = dueDate.getTime() - now.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          const notificationKey = `${task.id}-${diffDays}`;

          if (!notifiedTasks.current.has(notificationKey)) {
            if (diffDays === 7 || diffDays === 3 || diffDays === 1 || (diffDays === 0 && diffTime > 0)) {
              new Notification('마감일 알림', {
                body: `D-${diffDays}: ${task.title}`,
              });
              notifiedTasks.current.add(notificationKey);
            }
          }
        }
      });
    };

    const interval = setInterval(checkDueDate, 1000 * 60 * 60); // Check every hour

    return () => clearInterval(interval);
  }, [tasks]);
};
