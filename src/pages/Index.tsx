
import { useState } from 'react';
import { ProgressTracker } from '@/components/ProgressTracker';
import { PomodoroTimer } from '@/components/PomodoroTimer';
import { RewardSystem } from '@/components/RewardSystem';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Timer, BarChart3, Gift, ArrowRight } from 'lucide-react';

const Index = () => {
  const [currentPoints, setCurrentPoints] = useState(120);
  const todayTasks = [
    { id: 1, title: '아침 운동', duration: 30, timeSlot: '07:00', completed: true, locked: false },
    { id: 2, title: '프로젝트 기획서 작성', duration: 60, timeSlot: '09:00', completed: true, locked: false },
    { id: 3, title: '클라이언트 미팅', duration: 45, timeSlot: '14:00', completed: false, locked: false },
    { id: 4, title: '코드 리뷰', duration: 30, timeSlot: '16:00', completed: false, locked: true },
  ];

  const quickActions = [
    { title: '오늘 일정', icon: Calendar, path: '/today', color: 'from-blue-500 to-blue-600' },
    { title: '포모도로 타이머', icon: Timer, path: '/timer', color: 'from-red-500 to-red-600' },
    { title: '진행 리포트', icon: BarChart3, path: '/reports', color: 'from-green-500 to-green-600' },
    { title: '리워드 샵', icon: Gift, path: '/rewards', color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">안녕하세요! 👋</h1>
        <p className="text-xl text-gray-600">오늘도 생산적인 하루를 만들어보세요</p>
      </div>

      {/* 오늘의 주요 메트릭스 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">오늘의 진행률</h3>
          <div className="text-3xl font-bold text-blue-600">
            {Math.round((todayTasks.filter(t => t.completed).length / todayTasks.length) * 100)}%
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">완료된 작업</h3>
          <div className="text-3xl font-bold text-green-600">
            {todayTasks.filter(t => t.completed).length}/{todayTasks.length}
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">집중 세션</h3>
          <div className="text-3xl font-bold text-purple-600">3</div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">획득 포인트</h3>
          <div className="text-3xl font-bold text-yellow-600">{currentPoints}</div>
        </div>
      </div>

      {/* 빠른 액션 */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">빠른 액션</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link key={action.title} to={action.path}>
              <Button 
                className={`w-full h-24 bg-gradient-to-r ${action.color} hover:scale-105 transition-all duration-200 flex flex-col items-center justify-center space-y-2`}
              >
                <action.icon className="w-8 h-8" />
                <span className="text-sm font-medium">{action.title}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProgressTracker tasks={todayTasks} />
        </div>
        
        <div className="space-y-6">
          <PomodoroTimer />
          <RewardSystem currentPoints={currentPoints} />
        </div>
      </div>

      {/* 오늘의 일정 미리보기 */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">오늘의 일정 미리보기</h2>
          <Link to="/today">
            <Button variant="outline" className="flex items-center space-x-2">
              <span>전체 보기</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {todayTasks.slice(0, 4).map((task) => (
            <div 
              key={task.id}
              className={`p-4 rounded-lg border-2 ${
                task.completed 
                  ? 'bg-green-50 border-green-200' 
                  : task.locked 
                    ? 'bg-gray-50 border-gray-200' 
                    : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${task.completed ? 'line-through text-green-700' : 'text-gray-900'}`}>
                    {task.title}
                  </h4>
                  <p className="text-sm text-gray-500">{task.timeSlot} • {task.duration}분</p>
                </div>
                <div className="text-2xl">
                  {task.completed ? '✅' : task.locked ? '🔒' : '⏳'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
