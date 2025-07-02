import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Brain, Clock, TrendingUp, Lightbulb, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GeminiService } from '@/services/geminiService';
import { toast } from 'sonner';

interface AIAnalysisChartProps {
  scheduleData: any[];
  delayedTasks: any[];
}

export const AIAnalysisChart = ({ scheduleData, delayedTasks }: AIAnalysisChartProps) => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const geminiService = new GeminiService();
      const result = await geminiService.analyzeSchedulePattern({
        userScheduleData: scheduleData,
        delayedTasks: delayedTasks,
      });
      setAnalysis(result);
      toast.success('AI 분석이 완료되었습니다!');
    } catch (error) {
      console.error('AI 분석 오류:', error);
      toast.error('AI 분석 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Brain className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">AI 일정 패턴 분석</h2>
        </div>
        <Button 
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
        >
          {loading ? '분석 중...' : 'AI 분석 시작'}
        </Button>
      </div>

      {!analysis && !loading && (
        <div className="text-center py-12">
          <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">AI 분석을 시작하여 최적의 집중 시간대를 찾아보세요</p>
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">AI가 당신의 일정 패턴을 분석하고 있습니다...</p>
        </div>
      )}

      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 최적 집중 시간대 차트 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>최적 집중 시간대</span>
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analysis.optimalFocusHours}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" tickFormatter={(value) => `${value}시`} />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [value, '집중도 점수']}
                    labelFormatter={(label) => `${label}시`}
                  />
                  <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 집중 패턴 분석 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span>시간대별 효율성</span>
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analysis.focusPatterns}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ timeSlot, efficiency }) => `${timeSlot}: ${efficiency}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="efficiency"
                  >
                    {analysis.focusPatterns.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {analysis && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI 인사이트 */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center space-x-2">
              <Lightbulb className="w-5 h-5" />
              <span>생산성 인사이트</span>
            </h4>
            <ul className="text-sm text-blue-700 space-y-2">
              {analysis.productivityInsights.map((insight: string, index: number) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AI 추천사항 */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-3 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>AI 추천사항</span>
            </h4>
            <ul className="text-sm text-green-700 space-y-2">
              {analysis.recommendations.map((recommendation: string, index: number) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {analysis && analysis.delayedTaskAnalysis && (
        <div className="mt-8 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
          <h4 className="font-semibold text-red-800 mb-3 flex items-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <span>지연된 작업 분석 및 조치</span>
          </h4>
          <ul className="text-sm text-red-700 space-y-2">
            {analysis.delayedTaskAnalysis.map((item: any, index: number) => (
              <li key={index}>
                <p><strong>{item.task}</strong>: {item.analysis}</p>
                <p className="font-semibold">추천 조치: {item.recommendation}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
