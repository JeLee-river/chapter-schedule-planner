
import { StatsReport } from '@/components/StatsReport';
import { AIAnalysisChart } from '@/components/AIAnalysisChart';
import { FocusDistractionChart } from '@/components/FocusDistractionChart';

const ReportPage = () => {
  const sampleScheduleData = [
    { id: 1, title: '프로젝트 기획', duration: 60, completed: true, focusScore: 85 },
    { id: 2, title: '미팅 준비', duration: 30, completed: true, focusScore: 70 },
    { id: 3, title: '코드 리뷰', duration: 45, completed: false, focusScore: 90 },
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">리포트 & 분석</h1>
        <p className="text-gray-600">집중 패턴과 생산성을 분석하여 최적의 시간대를 찾아보세요</p>
      </div>

      <div className="space-y-8">
        <StatsReport />
        <FocusDistractionChart />
        <AIAnalysisChart scheduleData={sampleScheduleData} />
      </div>
    </div>
  );
};

export default ReportPage;
