
interface GeminiAnalysisRequest {
  userScheduleData: {
    completedTasks: Array<{
      title: string;
      startTime: string;
      endTime: string;
      focusScore: number;
      date: string;
    }>;
    weeklyPattern: Array<{
      day: string;
      productivity: number;
      focusTime: number;
    }>;
  };
}

interface GeminiAnalysisResponse {
  optimalFocusHours: Array<{
    hour: number;
    score: number;
    reason: string;
  }>;
  productivityInsights: string[];
  recommendations: string[];
  focusPatterns: Array<{
    timeSlot: string;
    efficiency: number;
    taskType: string;
  }>;
}

export class GeminiService {
  private apiKey: string;
  private apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-thinking-exp:generateContent';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async analyzeSchedulePattern(data: GeminiAnalysisRequest): Promise<GeminiAnalysisResponse> {
    const prompt = `
    다음 사용자의 일정 데이터를 분석해서 최적의 집중 시간대와 생산성 패턴을 찾아주세요:

    완료된 작업들:
    ${JSON.stringify(data.userScheduleData.completedTasks, null, 2)}

    주간 패턴:
    ${JSON.stringify(data.userScheduleData.weeklyPattern, null, 2)}

    다음 형식의 JSON으로 응답해주세요:
    {
      "optimalFocusHours": [
        {"hour": 9, "score": 95, "reason": "높은 집중도와 작업 완료율을 보임"},
        {"hour": 14, "score": 80, "reason": "점심 후 안정적인 생산성 유지"}
      ],
      "productivityInsights": [
        "오전 9-11시에 가장 높은 생산성을 보입니다",
        "금요일에 평균 20% 높은 집중도를 보입니다"
      ],
      "recommendations": [
        "오전 시간대에 중요한 작업을 배치하세요",
        "오후 3시 이후에는 가벼운 작업을 권장합니다"
      ],
      "focusPatterns": [
        {"timeSlot": "09:00-11:00", "efficiency": 92, "taskType": "창작 업무"},
        {"timeSlot": "14:00-16:00", "efficiency": 78, "taskType": "관리 업무"}
      ]
    }
    `;

    try {
      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API 호출 실패: ${response.status}`);
      }

      const result = await response.json();
      const content = result.candidates[0].content.parts[0].text;
      
      // JSON 응답 파싱
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('AI 응답에서 JSON을 찾을 수 없습니다');
      }

      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Gemini 분석 중 오류:', error);
      throw error;
    }
  }
}
