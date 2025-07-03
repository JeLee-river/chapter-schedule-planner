
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

interface DroppableAreaProps {
  id: string;
  children: React.ReactNode;
  title: string;
}

export const DroppableArea = ({ id, children, title }: DroppableAreaProps) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  
  

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'p-4 rounded-lg min-h-[200px] transition-colors duration-200',
        isOver ? 'bg-blue-100' : 'bg-gray-50'
      )}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-700">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
};
