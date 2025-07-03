
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Play, Pause } from 'lucide-react';

interface ActiveSession {
  id: string;
  partner: string;
  status: 'waiting' | 'focus' | 'break';
  timeRemaining: number;
  currentRound: number;
  totalRounds: number;
  focusMinutes: number;
  breakMinutes: number;
}

export const ActiveSessions = () => {
  const [sessions, setSessions] = useState<ActiveSession[]>([
    {
      id: '1',
      partner: 'Alice',
      status: 'focus',
      timeRemaining: 15 * 60, // 15 minutes in seconds
      currentRound: 2,
      totalRounds: 4,
      focusMinutes: 25,
      breakMinutes: 5,
    }
  ]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'waiting': return '대기 중';
      case 'focus': return '집중 중';
      case 'break': return '휴식 중';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'focus': return 'bg-green-100 text-green-800';
      case 'break': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // 타이머 업데이트 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      setSessions(prev => prev.map(session => ({
        ...session,
        timeRemaining: Math.max(0, session.timeRemaining - 1)
      })));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (sessions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>활성 세션</CardTitle>
          <CardDescription>현재 진행 중인 코워킹 세션이 없습니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>새 세션을 만들어보세요!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <Card key={session.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <CardTitle className="text-lg">{session.partner}와의 세션</CardTitle>
                  <CardDescription>
                    라운드 {session.currentRound}/{session.totalRounds} 
                    · {session.focusMinutes}분 집중 / {session.breakMinutes}분 휴식
                  </CardDescription>
                </div>
              </div>
              <Badge className={getStatusColor(session.status)}>
                {getStatusText(session.status)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-gray-900 mb-2">
                  {formatTime(session.timeRemaining)}
                </div>
                <p className="text-sm text-gray-600">남은 시간</p>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Pause className="w-4 h-4 mr-2" />
                  일시정지
                </Button>
                <Button variant="outline" size="sm">
                  <Play className="w-4 h-4 mr-2" />
                  재시작
                </Button>
              </div>
            </div>

            {session.status === 'waiting' && (
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-yellow-800 text-sm">
                  파트너가 준비되면 세션이 시작됩니다.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
