
import { useState, useEffect } from 'react';
import { Play, Pause, Square, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState<'work' | 'break'>('work');
  const [completedSessions, setCompletedSessions] = useState(0);

  const totalSeconds = sessionType === 'work' ? 25 * 60 : 5 * 60;
  const currentSeconds = minutes * 60 + seconds;
  const progress = ((totalSeconds - currentSeconds) / totalSeconds) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isRunning && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }, 1000);
    } else if (isRunning && minutes === 0 && seconds === 0) {
      // 세션 완료
      setIsRunning(false);
      if (sessionType === 'work') {
        setCompletedSessions(prev => prev + 1);
        setSessionType('break');
        setMinutes(5);
      } else {
        setSessionType('work');
        setMinutes(25);
      }
      setSeconds(0);
      
      // 알림 (브라우저 알림)
      if (Notification.permission === 'granted') {
        new Notification(
          sessionType === 'work' ? '작업 세션 완료!' : '휴식 시간 끝!', 
          {
            body: sessionType === 'work' ? '휴식을 취하세요.' : '다시 집중할 시간입니다.',
            icon: '/favicon.ico'
          }
        );
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, minutes, seconds, sessionType]);

  const startTimer = () => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (sessionType === 'work') {
      setMinutes(25);
    } else {
      setMinutes(5);
    }
    setSeconds(0);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center space-x-2 mb-4">
        <Timer className="w-6 h-6 text-red-500" />
        <h3 className="text-xl font-bold text-gray-900">포모도로 타이머</h3>
      </div>

      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-gray-900 mb-2">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div className={`text-sm font-medium ${
          sessionType === 'work' ? 'text-red-600' : 'text-green-600'
        }`}>
          {sessionType === 'work' ? '🎯 집중 시간' : '☕ 휴식 시간'}
        </div>
      </div>

      <Progress value={progress} className="mb-4" />

      <div className="flex space-x-2 mb-4">
        {!isRunning ? (
          <Button onClick={startTimer} className="flex-1">
            <Play className="w-4 h-4 mr-2" />
            시작
          </Button>
        ) : (
          <Button onClick={pauseTimer} variant="outline" className="flex-1">
            <Pause className="w-4 h-4 mr-2" />
            일시정지
          </Button>
        )}
        <Button onClick={resetTimer} variant="outline">
          <Square className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-center text-sm text-gray-600">
        <div>완료된 세션: {completedSessions}</div>
        <div className="mt-1">목표: 8세션/일</div>
      </div>
    </div>
  );
};
