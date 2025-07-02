
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Clock, Lock, CheckCircle, GripVertical, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Task {
  id: number;
  title: string;
  duration: number;
  timeSlot: string;
  completed: boolean;
  locked: boolean;
  priority: string;
}

interface TaskCardProps {
  task: Task;
  onComplete: () => void;
}

export const TaskCard = ({ task, onComplete }: TaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const getPoints = (priority: string) => {
    switch (priority) {
      case 'high': return 15;
      case 'medium': return 10;
      case 'low': return 5;
      default: return 5;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-white rounded-lg border-2 p-4 shadow-sm transition-all duration-200",
        {
          "border-green-300 bg-green-50": task.completed,
          "border-gray-200 hover:border-blue-300": !task.completed && !task.locked,
          "border-gray-300 bg-gray-50 opacity-60": task.locked,
          "shadow-lg scale-105": isDragging,
        }
      )}
    >
      <div className="flex items-center space-x-3">
        {/* 드래그 핸들 */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
        >
          <GripVertical className="w-5 h-5" />
        </div>

        {/* 상태 아이콘 */}
        <div className="flex-shrink-0">
          {task.completed ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : task.locked ? (
            <Lock className="w-6 h-6 text-gray-400" />
          ) : (
            <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
          )}
        </div>

        {/* 작업 정보 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className={cn(
              "font-medium truncate",
              {
                "text-gray-900": !task.completed && !task.locked,
                "text-green-700 line-through": task.completed,
                "text-gray-500": task.locked,
              }
            )}>
              {task.title}
            </h3>
            <Badge className={cn("text-xs", getPriorityColor(task.priority))}>
              {getPriorityIcon(task.priority)} {task.priority}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{task.timeSlot}</span>
            </div>
            <span>{task.duration}분</span>
            {!task.completed && (
              <div className="flex items-center space-x-1 text-blue-600">
                <Star className="w-3 h-3" />
                <span className="text-xs font-medium">+{getPoints(task.priority)}P</span>
              </div>
            )}
            {task.locked && <span className="text-orange-600 font-medium">🔒 잠금</span>}
          </div>
        </div>

        {/* 완료 버튼 */}
        {!task.completed && !task.locked && (
          <Button
            onClick={onComplete}
            size="sm"
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          >
            완료
          </Button>
        )}
      </div>

      {task.completed && (
        <div className="mt-2 text-xs text-green-600 font-medium">
          ✨ +{getPoints(task.priority)} 휴식 포인트를 획득했습니다!
        </div>
      )}
    </div>
  );
};
