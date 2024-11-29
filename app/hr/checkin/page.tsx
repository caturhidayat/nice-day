'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, MapPin } from 'lucide-react';

const AttendanceCheck: React.FC = () => {
  const [location, setLocation] = useState<{ 
    latitude?: number, 
    longitude?: number 
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [todayAttendance, setTodayAttendance] = useState<any>(null);
  const [user, setUser] = useState<any>(null); // Simplified user state

  // Fetch today's attendance on component mount
  useEffect(() => {
    // Fetch user from local storage or authentication context
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchTodayAttendance = async () => {
      try {
        const response = await fetch('/api/attendance/today', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add authentication token if needed
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch attendance');
        }

        const data = await response.json();
        setTodayAttendance(data);
      } catch (error) {
        console.error('Error fetching attendance', error);
      }
    };

    fetchTodayAttendance();
  }, []);

  // Get current location
  const getLocation = () => {
    return new Promise<{ latitude: number, longitude: number }>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => reject(error)
      );
    });
  };

  // Capture photo from webcam
  const capturePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      await new Promise(resolve => video.onloadedmetadata = resolve);
      video.play();

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0);

      // Stop all tracks to release camera
      stream.getTracks().forEach(track => track.stop());

      return canvas.toDataURL('image/jpeg');
    } catch (error) {
      console.error('Error capturing photo', error);
      return null;
    }
  };

  // Check-in handler
  const handleCheckIn = async () => {
    setIsLoading(true);
    try {
      // Get location
      const location = await getLocation();

      // Capture photo
      const photoUrl = await capturePhoto();

      // Call check-in API
    //   const response = await fetch('/api/attendance/checkin', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${localStorage.getItem('token')}`
    //     },
    //     body: JSON.stringify({
    //       ...location,
    //       photoUrl
    //     })
    //   });

    //   if (!response.ok) {
    //     throw new Error('Check-in failed');
    //   }

    console.log('location', location);

    //   const data = await response.json();
    //   setTodayAttendance(data);
      alert('Check-in successful!');
    } catch (error) {
      console.error('Check-in failed', error);
      alert('Check-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Check-out handler
  const handleCheckOut = async () => {
    setIsLoading(true);
    try {
      // Get location
      const location = await getLocation();

      // Capture photo
      const photoUrl = await capturePhoto();

      // Call check-out API
      const response = await fetch('/api/attendance/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...location,
          photoUrl
        })
      });

      if (!response.ok) {
        throw new Error('Check-out failed');
      }

      const data = await response.json();
      setTodayAttendance(data);
      alert('Check-out successful!');
    } catch (error) {
      console.error('Check-out failed', error);
      alert('Check-out failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Daily Attendance</h2>
      
      {/* Check-in Button */}
      {!todayAttendance?.checkInTime && (
        <Button 
          onClick={handleCheckIn} 
          disabled={isLoading}
          className="w-full mb-4"
        >
          {isLoading ? 'Checking In...' : 'Check In'}
          <MapPin className="ml-2" />
        </Button>
      )}

      {/* Check-out Button */}
      {todayAttendance?.checkInTime && !todayAttendance?.checkOutTime && (
        <Button 
          onClick={handleCheckOut} 
          disabled={isLoading}
          className="w-full mb-4"
        >
          {isLoading ? 'Checking Out...' : 'Check Out'}
          <Camera className="ml-2" />
        </Button>
      )}

      {/* Attendance Details */}
      {todayAttendance && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p>Check-in Time: {new Date(todayAttendance.checkInTime).toLocaleString()}</p>
          {todayAttendance.checkOutTime && (
            <p>Check-out Time: {new Date(todayAttendance.checkOutTime).toLocaleString()}</p>
          )}
          {todayAttendance.workHours && (
            <p>Work Hours: {todayAttendance.workHours.toFixed(2)}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendanceCheck;