
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface CreateChallengeDialogProps {
  onCreateChallenge: (challenge: {
    title: string;
    description: string;
    type: string;
    duration: string;
  }) => void;
}

export const CreateChallengeDialog = ({ onCreateChallenge }: CreateChallengeDialogProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!title.trim() || !type || !duration) {
      toast({
        title: "모든 필드를 입력해주세요",
        variant: "destructive",
      });
      return;
    }

    onCreateChallenge({
      title,
      description,
      type,
      duration
    });

    toast({
      title: "챌린지가 생성되었습니다",
      description: `"${title}" 챌린지가 성공적으로 만들어졌습니다.`,
    });

    // 폼 초기화 및 다이얼로그 닫기
    setTitle('');
    setDescription('');
    setType('');
    setDuration('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
          새 챌린지 만들기
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>새 챌린지 만들기</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">챌린지 제목</label>
            <Input
              placeholder="챌린지 제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">설명</label>
            <Textarea
              placeholder="챌린지에 대한 설명을 입력하세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">챌린지 유형</label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="챌린지 유형을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="focus">집중 챌린지</SelectItem>
                <SelectItem value="task">작업 완료 챌린지</SelectItem>
                <SelectItem value="team">팀 협업 챌린지</SelectItem>
                <SelectItem value="habit">습관 형성 챌린지</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">기간</label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue placeholder="챌린지 기간을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3days">3일</SelectItem>
                <SelectItem value="1week">1주일</SelectItem>
                <SelectItem value="2weeks">2주일</SelectItem>
                <SelectItem value="1month">1개월</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button onClick={handleSubmit}>
            챌린지 생성
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
