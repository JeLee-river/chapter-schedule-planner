
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SessionCreator = () => {
  const [partnerEmail, setPartnerEmail] = useState('');
  const [focusMinutes, setFocusMinutes] = useState([25]);
  const [breakMinutes, setBreakMinutes] = useState([5]);
  const [rounds, setRounds] = useState([4]);
  const [sessionLink, setSessionLink] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleCreateSession = async () => {
    if (!partnerEmail) {
      toast({
        title: "이메일을 입력해주세요",
        description: "파트너의 이메일 주소가 필요합니다.",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    
    // 세션 생성 시뮬레이션
    setTimeout(() => {
      const sessionId = Math.random().toString(36).substring(2, 15);
      const link = `${window.location.origin}/cowork/join?sessionId=${sessionId}`;
      setSessionLink(link);
      setIsCreating(false);
      
      toast({
        title: "세션이 생성되었습니다!",
        description: "초대 링크가 생성되었습니다. 파트너와 공유하세요.",
      });
    }, 1000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(sessionLink);
    toast({
      title: "링크가 복사되었습니다",
      description: "파트너에게 링크를 공유하세요.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>새 코워킹 세션 만들기</CardTitle>
        <CardDescription>파트너와 함께할 포모도로 세션을 설정하세요</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="partner-email">파트너 이메일</Label>
          <Input
            id="partner-email"
            type="email"
            placeholder="partner@example.com"
            value={partnerEmail}
            onChange={(e) => setPartnerEmail(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <Label>집중 시간: {focusMinutes[0]}분</Label>
            <Slider
              value={focusMinutes}
              onValueChange={setFocusMinutes}
              max={60}
              min={15}
              step={5}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <Label>휴식 시간: {breakMinutes[0]}분</Label>
            <Slider
              value={breakMinutes}
              onValueChange={setBreakMinutes}
              max={30}
              min={5}
              step={5}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <Label>라운드 수: {rounds[0]}회</Label>
            <Slider
              value={rounds}
              onValueChange={setRounds}
              max={8}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        <Button 
          onClick={handleCreateSession} 
          disabled={isCreating}
          className="w-full"
        >
          {isCreating ? '세션 생성 중...' : '세션 생성하기'}
        </Button>

        {sessionLink && (
          <div className="space-y-3 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <Label className="text-green-800 font-semibold">초대 링크</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="text-green-700 border-green-300"
              >
                <Copy className="w-4 h-4 mr-2" />
                복사
              </Button>
            </div>
            <div className="p-2 bg-white rounded border text-sm break-all text-green-700">
              {sessionLink}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
