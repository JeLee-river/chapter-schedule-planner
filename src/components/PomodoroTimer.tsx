
import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface PomodoroTimerProps {
  taskId: number | string;
  taskTitle: string;
  timeLeft: number;
  isRunning: boolean;
  isBreak: boolean;
  sessions: number;
  onTimeLeftChange: (newTime: number) => void;
  onIsRunningChange: (newIsRunning: boolean) => void;
  onIsBreakChange: (newIsBreak: boolean) => void;
  onSessionsChange: (newSessions: number) => void;
  onCompleteSession: (newSessions: number, newIsBreak: boolean, newTimeLeft: number) => void;
  onResetTimer: (initialTime: number, initialIsBreak: boolean) => void;
}

export const PomodoroTimer = ({
  taskId,
  taskTitle,
  timeLeft,
  isRunning,
  isBreak,
  sessions,
  onTimeLeftChange,
  onIsRunningChange,
  onIsBreakChange,
  onSessionsChange,
  onCompleteSession,
  onResetTimer,
}: PomodoroTimerProps) => {
  const { toast } = useToast();

  const workDuration = 25 * 60; // 25분
  const breakDuration = 5 * 60; // 5분
  const longBreakDuration = 15 * 60; // 15분

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        onTimeLeftChange(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSessionComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onTimeLeftChange]);

  const handleSessionComplete = () => {
    onIsRunningChange(false);
    
    if (!isBreak) {
      // 작업 세션 완료
      const newSessions = sessions + 1;
      onSessionsChange(newSessions);
      toast({
        title: "포모도로 세션 완료! 🍅",
        description: "훌륭합니다! 잠시 휴식을 취하세요. +25 포인트를 획득했습니다!",
      });
      
      // 4번째 세션 후 긴 휴식
      const nextBreakDuration = (newSessions) % 4 === 0 ? longBreakDuration : breakDuration;
      onCompleteSession(newSessions, true, nextBreakDuration);
    } else {
      // 휴식 완료
      toast({
        title: "휴식 시간 종료! ⏰",
        description: "다음 포모도로 세션을 시작하세요!",
      });
      onCompleteSession(sessions, false, workDuration);
    }
  };

  const handleStart = () => {
    onIsRunningChange(true);
  };

  const handlePause = () => {
    onIsRunningChange(false);
  };

  const handleReset = () => {
    onResetTimer(isBreak ? breakDuration : workDuration, isBreak);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalTime = isBreak ? (sessions % 4 === 0 ? longBreakDuration : breakDuration) : workDuration;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">포모도로 타이머 - {taskTitle}</h3> {/* taskTitle 표시 */}
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className={`text-6xl font-mono font-bold ${
            isBreak ? 'text-green-600' : 'text-red-500'
          }`}>
            {formatTime(timeLeft)}
          </div>
          
          <div className="text-lg text-gray-600">
            {isBreak ? '휴식 시간' : '집중 시간'}
          </div>

          <Progress value={getProgress()} className="w-full h-3" />
        </div>

        <div className="flex justify-center space-x-4">
          {!isRunning ? (
            <Button 
              onClick={handleStart}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              size="lg"
            >
              <Play className="w-5 h-5 mr-2" />
              시작
            </Button>
          ) : (
            <Button 
              onClick={handlePause}
              variant="outline"
              size="lg"
            >
              <Pause className="w-5 h-5 mr-2" />
              일시정지
            </Button>
          )}
          
          <Button 
            onClick={handleReset}
            variant="outline"
            size="lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            리셋
          </Button>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{sessions}</div>
              <div className="text-sm text-gray-500">완료 세션</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{sessions * 25}</div>
              <div className="text-sm text-gray-500">획득 포인트</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
