import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Clock, Calendar } from "lucide-react";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: { 
    title: string; 
    duration: number; 
    timeSlot: string; 
    priority: string; 
    location?: { latitude: number; longitude: number; };
    notificationType: 'time' | 'location' | 'none';
    dueDate?: string;
    tags?: string[];
  }) => void;
}

export function AddTaskModal({ isOpen, onClose, onAddTask }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("30");
  const [timeSlot, setTimeSlot] = useState("09:00");
  const [priority, setPriority] = useState("medium");
  const [location, setLocation] = useState<{ latitude: number; longitude: number; } | undefined>(undefined);
  const [isCustomTime, setIsCustomTime] = useState(false);
  const [notificationType, setNotificationType] = useState<'time' | 'location' | 'none'>('none');
  const [dueDate, setDueDate] = useState<string | undefined>(undefined);
  const [tags, setTags] = useState<string>("");

  const handleAddLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        alert("위치가 추가되었습니다.");
      }, (error) => {
        console.error("Error getting location:", error);
        alert("위치를 가져오는 데 실패했습니다.");
      });
    } else {
      alert("이 브라우저에서는 위치 정보가 지원되지 않습니다.");
    }
  };

  const handleSubmit = () => {
    if (title.trim() === "") {
      alert("작업 제목을 입력해주세요.");
      return;
    }
    onAddTask({
      title,
      duration: parseInt(duration),
      timeSlot,
      priority,
      location,
      notificationType,
      dueDate,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
    });
    setTitle("");
    setDuration("30");
    setTimeSlot("09:00");
    setPriority("medium");
    setLocation(undefined);
    setIsCustomTime(false);
    setNotificationType('none');
    setDueDate(undefined);
    setTags("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>새 작업 추가</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              제목
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              기간 (분)
            </Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="기간" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15분</SelectItem>
                <SelectItem value="30">30분</SelectItem>
                <SelectItem value="45">45분</SelectItem>
                <SelectItem value="60">60분</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              우선순위
            </Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="우선순위" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">높음</SelectItem>
                <SelectItem value="medium">중간</SelectItem>
                <SelectItem value="low">낮음</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tags" className="text-right">
              태그 (쉼표로 구분)
            </Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="col-span-3"
              placeholder="예: 공부, 운동, 개인"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">알림 유형</Label>
            <RadioGroup value={notificationType} onValueChange={(value) => setNotificationType(value as any)} className="col-span-3 flex items-center">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="r-none" />
                <Label htmlFor="r-none">없음</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="time" id="r-time" />
                <Label htmlFor="r-time">시간</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="location" id="r-location" />
                <Label htmlFor="r-location">위치</Label>
              </div>
            </RadioGroup>
          </div>
          {notificationType === 'time' && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueDate" className="text-right">마감일</Label>
                <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="timeSlot" className="text-right">
                  시간
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                  {isCustomTime ? (
                    <Input
                      id="timeSlot"
                      type="time"
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    <Select value={timeSlot} onValueChange={setTimeSlot}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="시간" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 15 }, (_, i) => i + 9).map((hour) => (
                          <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                            {`${hour.toString().padStart(2, '0')}:00`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <Button variant="outline" size="icon" onClick={() => setIsCustomTime(!isCustomTime)}>
                    <Clock className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
          {notificationType === 'location' && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">위치</Label>
              <Button variant="outline" className="col-span-3" onClick={handleAddLocation}>
                  <MapPin className="mr-2 h-4 w-4" />
                  {location ? "위치 변경" : "현재 위치 추가"}
              </Button>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>추가</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}