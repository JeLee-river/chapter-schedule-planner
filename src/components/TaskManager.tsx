
import { useState } from 'react';
import { Plus, Settings, Filter, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import { AddTaskModal } from './AddTaskModal';

interface TaskManagerProps {
  onAddTask: (task: {
    title: string;
    duration: number;
    priority: string;
    location?: { latitude: number; longitude: number; };
  }) => void;
}

const DraggableTask = ({ taskData, isDragging }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable-task-manager-item',
    data: taskData,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'p-2 rounded-lg flex items-center space-x-2 bg-gray-100 border-2 border-dashed',
        isDragging && 'opacity-50 shadow-lg'
      )}
    >
      <div {...listeners} {...attributes} className="cursor-grab">
        <GripVertical className="w-5 h-5 text-gray-500" />
      </div>
      <span>{taskData.title || '새 작업'}</span>
    </div>
  );
};

export const TaskManager = ({ onAddTask }: TaskManagerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [taskDuration, setTaskDuration] = useState('30');
  const [taskPriority, setTaskPriority] = useState('medium');
  const { toast } = useToast();

  const { isDragging } = useDraggable({
    id: 'draggable-task-manager-item',
  });

  const handleAddTask = () => {
    if (newTask.trim()) {
      const taskData = {
        title: newTask,
        duration: parseInt(taskDuration),
        priority: taskPriority,
      };

      onAddTask(taskData);

      toast({
        title: '작업이 추가되었습니다',
        description: `"${newTask}"이(가) 오늘 일정에 추가되었습니다.`,
      });

      setNewTask('');
    }
  };

  const taskData = {
    title: newTask,
    duration: parseInt(taskDuration),
    priority: taskPriority,
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">빠른 작업 추가</h3>
        <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>
            <Settings className="w-4 h-4 mr-2" />
            상세 설정
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Input
            placeholder="새 작업을 입력하세요..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              예상 소요시간
            </label>
            <Select value={taskDuration} onValueChange={setTaskDuration}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15분</SelectItem>
                <SelectItem value="30">30분</SelectItem>
                <SelectItem value="45">45분</SelectItem>
                <SelectItem value="60">1시간</SelectItem>
                <SelectItem value="90">1시간 30분</SelectItem>
                <SelectItem value="120">2시간</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              우선순위
            </label>
            <Select value={taskPriority} onValueChange={setTaskPriority}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">🔴 높음</SelectItem>
                <SelectItem value="medium">🟡 보통</SelectItem>
                <SelectItem value="low">🟢 낮음</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DraggableTask taskData={taskData} isDragging={isDragging} />

        <Button
          onClick={handleAddTask}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          disabled={!newTask.trim()}
        >
          <Plus className="w-4 h-4 mr-2" />
          작업 추가
        </Button>
      </div>

      {/* 작업 템플릿 */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">빠른 템플릿</h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: '이메일 확인', duration: '15분' },
            { name: '미팅 준비', duration: '30분' },
            { name: '코드 리뷰', duration: '45분' },
            { name: '문서 작성', duration: '1시간' },
          ].map((template, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs justify-start"
              onClick={() => {
                setNewTask(template.name);
                setTaskDuration(template.duration.replace(/[^\d]/g, ''));
              }}
            >
              {template.name}
            </Button>
          ))}
        </div>
      </div>
      <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddTask={onAddTask} />
    </div>
  );
};
