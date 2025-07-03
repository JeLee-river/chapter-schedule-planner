
import { useState } from 'react';
import { Plus, Clock, Users, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SessionCreator } from '@/components/SessionCreator';
import { ActiveSessions } from '@/components/ActiveSessions';
import { SessionHistory } from '@/components/SessionHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const VirtualCoworkingPage = () => {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">가상 코워킹</h1>
        <p className="text-gray-600">파트너와 함께 포모도로 세션을 공유하고 집중력을 높이세요</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            세션 생성
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            활성 세션
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="w-4 h-4" />
            세션 기록
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <SessionCreator />
        </TabsContent>

        <TabsContent value="active" className="space-y-6">
          <ActiveSessions />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <SessionHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VirtualCoworkingPage;
