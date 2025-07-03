
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Calendar, Target } from 'lucide-react';

interface SessionRecord {
  id: string;
  partner: string;
  date: string;
  totalFocusTime: number; // in minutes
  roundsCompleted: number;
  totalRounds: number;
  status: 'completed' | 'incomplete';
}

export const SessionHistory = () => {
  const [history] = useState<SessionRecord[]>([
    {
      id: '1',
      partner: 'Alice',
      date: '2024-01-15',
      totalFocusTime: 100,
      roundsCompleted: 4,
      totalRounds: 4,
      status: 'completed'
    },
    {
      id: '2',
      partner: 'Bob',
      date: '2024-01-14',
      totalFocusTime: 75,
      roundsCompleted: 3,
      totalRounds: 4,
      status: 'incomplete'
    },
    {
      id: '3',
      partner: 'Charlie',
      date: '2024-01-13',
      totalFocusTime: 125,
      roundsCompleted: 5,
      totalRounds: 5,
      status: 'completed'
    }
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
  };

  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>세션 기록</CardTitle>
          <CardDescription>완료된 코워킹 세션 기록이 없습니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>첫 번째 세션을 시작해보세요!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>세션 기록</CardTitle>
          <CardDescription>지난 코워킹 세션들을 확인하세요</CardDescription>
        </CardHeader>
      </Card>

      {history.map((record) => (
        <Card key={record.id}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">{record.partner}와의 세션</h3>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(record.date)}
                  </p>
                </div>
              </div>
              <Badge 
                className={
                  record.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-orange-100 text-orange-800'
                }
              >
                {record.status === 'completed' ? '완료' : '미완료'}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">총 집중 시간</p>
                  <p className="font-semibold">{formatDuration(record.totalFocusTime)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">완료 라운드</p>
                  <p className="font-semibold">
                    {record.roundsCompleted}/{record.totalRounds} 라운드
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
