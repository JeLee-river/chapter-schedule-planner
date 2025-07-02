import { useState, useEffect } from "react";
import { AIAnalysisChart } from "@/components/AIAnalysisChart";
import { PomodoroStats } from "@/components/PomodoroStats";
import { StatsReport } from "@/components/StatsReport";
import { Button } from "@/components/ui/button";
import { FocusDistractionChart } from "@/components/FocusDistractionChart";

// 샘플 데이터 (실제로는 API에서 가져와야 함)
const sampleWeeklyData = {
  weeklyData: [
    { day: '월', completed: 6, planned: 8, focusTime: 120 },
    { day: '화', completed: 8, planned: 8, focusTime: 180 },
    { day: '수', completed: 5, planned: 7, focusTime: 90 },
    { day: '목', completed: 7, planned: 8, focusTime: 150 },
    { day: '금', completed: 9, planned: 10, focusTime: 200 },
    { day: '토', completed: 4, planned: 5, focusTime: 80 },
    { day: '일', completed: 3, planned: 4, focusTime: 60 },
  ],
  focusTimeData: [
    { time: '09:00', focus: 85 },
    { time: '10:00', focus: 95 },
    { time: '11:00', focus: 75 },
    { time: '14:00', focus: 60 },
    { time: '15:00', focus: 80 },
    { time: '16:00', focus: 90 },
    { time: '17:00', focus: 70 },
  ],
  stats: {
    achievementRate: 87,
    totalFocusTime: "12.2시간",
    completedTasks: 42,
    pomodoroSessions: 28,
  },
  aiInsights: [
    "오전 10-11시에 가장 높은 집중도를 보입니다",
    "금요일에 가장 생산적인 패턴을 보입니다",
    "주말 휴식 후 월요일 집중도가 향상됩니다",
  ],
  pomodoroChartData: [
    { day: "월", activated: 8, completed: 6 },
    { day: "화", activated: 10, completed: 8 },
    { day: "수", activated: 7, completed: 7 },
    { day: "목", activated: 12, completed: 10 },
    { day: "금", activated: 9, completed: 5 },
    { day: "토", activated: 4, completed: 4 },
    { day: "일", activated: 2, completed: 1 },
  ],
  scheduleData: { 
    completedTasks: [
      { title: '프로젝트 기획', startTime: '09:00', endTime: '10:30', focusScore: 95, date: '2024-01-15' },
      { title: '코드 리뷰', startTime: '14:00', endTime: '15:00', focusScore: 80, date: '2024-01-15' },
    ],
    weeklyPattern: [
      { day: '월', productivity: 85, focusTime: 240 },
      { day: '화', productivity: 90, focusTime: 280 },
    ]
   },
  delayedTasks: [ 
    { title: '디자인 시스템 문서화', reason: '집중력 저하' },
   ],
};

const sampleMonthlyData = {
  weeklyData: [ /* 월간 데이터 */ ],
  focusTimeData: [ /* 월간 데이터 */ ],
  stats: {
    achievementRate: 92,
    totalFocusTime: "51.5시간",
    completedTasks: 188,
    pomodoroSessions: 112,
  },
  aiInsights: [
    "월초에 생산성이 가장 높습니다.",
    "세 번째 주에 집중력이 다소 저하되는 패턴을 보입니다.",
    "주기적인 휴식을 통해 번아웃을 예방하세요.",
  ],
  pomodoroChartData: [ /* 월간 데이터 */ ],
  scheduleData: { /* ... */ },
  delayedTasks: [ /* ... */ ],
};

const ReportPage = () => {
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('weekly');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      if (timeRange === 'weekly') {
        setReportData(sampleWeeklyData);
      } else {
        const monthlyStats = { ...sampleMonthlyData.stats };
        const monthlyInsights = [ ...sampleMonthlyData.aiInsights ];
        const monthlyPomodoro = sampleWeeklyData.pomodoroChartData.map(d => ({ ...d, activated: d.activated * 4, completed: d.completed * 4 }));
        setReportData({ ...sampleWeeklyData, stats: monthlyStats, aiInsights: monthlyInsights, pomodoroChartData: monthlyPomodoro });
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRange]);

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!reportData) {
    return <div className="p-4">데이터를 불러오는데 실패했습니다.</div>;
  }

  return (
    <div className="p-4">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">리포트</h1>
            <div className="flex space-x-2">
                <Button variant={timeRange === 'weekly' ? 'default' : 'outline'} onClick={() => setTimeRange('weekly')}>주간</Button>
                <Button variant={timeRange === 'monthly' ? 'default' : 'outline'} onClick={() => setTimeRange('monthly')}>월간</Button>
            </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
            <StatsReport 
                weeklyData={reportData.weeklyData} 
                focusTimeData={reportData.focusTimeData} 
                stats={reportData.stats} 
                aiInsights={reportData.aiInsights} 
            />
            <PomodoroStats chartData={reportData.pomodoroChartData} />
            <AIAnalysisChart scheduleData={reportData.scheduleData} delayedTasks={reportData.delayedTasks} />
            <FocusDistractionChart />
        </div>
    </div>
  );
};

export default ReportPage;