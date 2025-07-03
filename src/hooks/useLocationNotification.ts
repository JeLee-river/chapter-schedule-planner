import { useState, useEffect, useRef } from 'react';

interface Task {
  id: number | string;
  title: string;
  completed: boolean;
  location?: {
    latitude: number;
    longitude: number;
  };
}

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in metres
};

export const useLocationNotification = (tasks: Task[], radius: number = 100) => {
  const [notifiedTasks, setNotifiedTasks] = useState<Set<number | string>>(new Set());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const requestPermissions = async () => {
      if ('Notification' in window && 'geolocation' in navigator) {
        const notificationPermission = await Notification.requestPermission();
        if (notificationPermission !== 'granted') {
          console.log('Notification permission not granted.');
          return;
        }

        navigator.geolocation.getCurrentPosition(
          () => { startWatching(); },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              console.log('Geolocation permission denied.');
            }
          }
        );
      }
    };

    requestPermissions();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startWatching = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        tasks.forEach((task) => {
          if (task.location && !task.completed && !notifiedTasks.has(task.id) && task.notificationType === 'location') {
            const distance = calculateDistance(
              latitude,
              longitude,
              task.location.latitude,
              task.location.longitude
            );

            if (distance <= radius) {
              new Notification('위치 기반 알림', {
                body: `목표 위치 근처입니다: ${task.title}`,
              });
              setNotifiedTasks((prev) => new Set(prev).add(task.id));
            }
          }
        });
      });
    }, 60000); // 1분마다 위치 확인
  };
};
