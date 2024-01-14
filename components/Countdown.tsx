import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';

interface ICountdownProps {
  title: string;
  targetDate: Date;
}

const Countdown = ({ title, targetDate }: ICountdownProps) => {
  const [countDownTime, setCountDownTime] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const handlePress = () => {
    Linking.openURL('https://thecookie.ninja/');
  };

  const getTimeDifference = (countDownTime: any) => {
    const currentTime = new Date().getTime();
    const timeDifference = countDownTime - currentTime;
    let days =
      Math.floor(timeDifference / (24 * 60 * 60 * 1000)) >= 10
        ? `${Math.floor(timeDifference / (24 * 60 * 60 * 1000))}`
        : `0${Math.floor(timeDifference / (24 * 60 * 60 * 1000))}`;
    const hours =
      Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)) >= 10
        ? `${Math.floor(
          (timeDifference % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
        )}`
        : `0${Math.floor(
          (timeDifference % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
        )}`;
    const minutes =
      Math.floor((timeDifference % (60 * 60 * 1000)) / (1000 * 60)) >= 10
        ? `${Math.floor((timeDifference % (60 * 60 * 1000)) / (1000 * 60))}`
        : `0${Math.floor((timeDifference % (60 * 60 * 1000)) / (1000 * 60))}`;
    const seconds =
      Math.floor((timeDifference % (60 * 1000)) / 1000) >= 10
        ? `${Math.floor((timeDifference % (60 * 1000)) / 1000)}`
        : `0${Math.floor((timeDifference % (60 * 1000)) / 1000)}`;
    if (timeDifference < 0) {
      setCountDownTime({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
      });
      clearInterval(intervalId);
    } else {
      setCountDownTime({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });
    }
  };

  let intervalId: any;


  const startCountDown = useCallback(() => {
    const customDate = new Date(targetDate);

    if (isNaN(customDate.getTime())) {
      console.error('Invalid targetDate:', targetDate);
      return;
    }

    const countDownDate = new Date(customDate.getTime() + 1000); // Adding one second

    console.log('customDate:', customDate);
    console.log('countDownDate:', countDownDate);

    intervalId = setInterval(() => {
      getTimeDifference(countDownDate.getTime());
    }, 1000);
  }, [targetDate]);

  useEffect(() => {
    console.log('Effect is running...');
    startCountDown();

    return () => {
      console.log('Cleaning up...');
      clearInterval(intervalId);
    };
  }, [startCountDown]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 4 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 24, color: 'white', textAlign: 'center' }}>
          {title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          {/* Days */}
          <View style={{ flexDirection: 'row', gap: 1 }}>
            {[...countDownTime?.days].map((digit, index) => (
              <Text
                key={index}
                style={{
                  backgroundColor: '#3490de',
                  fontWeight: 'bold',
                  color: '#FBFAF8',
                  fontSize: 30,
                  paddingVertical: 2,
                  paddingHorizontal: 3,
                  borderRadius: 8,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.5,
                  shadowRadius: 6,
                }}
              >
                {digit}
              </Text>
            ))}
          </View>
          <Text style={{ color: '#FBFAF8', fontSize: 40 }}>:</Text>
          {/* Hours */}
          <View style={{ flexDirection: 'row', gap: 1 }}>
            {[...countDownTime?.hours].map((digit, index) => (
              <Text
                key={index}
                style={{
                  backgroundColor: '#3490de',
                  fontWeight: 'bold',
                  color: '#FBFAF8',
                  fontSize: 30,
                  paddingVertical: 2,
                  paddingHorizontal: 3,
                  borderRadius: 8,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.5,
                  shadowRadius: 6,
                }}
              >
                {digit}
              </Text>
            ))}
          </View>
          <Text style={{ color: '#FBFAF8', fontSize: 40 }}>:</Text>
          {/* Minutes */}
          <View style={{ flexDirection: 'row', gap: 1 }}>
            {[...countDownTime?.minutes].map((digit, index) => (
              <Text
                key={index}
                style={{
                  backgroundColor: '#3490de',
                  fontWeight: 'bold',
                  color: '#FBFAF8',
                  fontSize: 30,
                  paddingVertical: 2,
                  paddingHorizontal: 3,
                  borderRadius: 8,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.5,
                  shadowRadius: 6,
                }}
              >
                {digit}
              </Text>
            ))}
          </View>
          <Text style={{ color: '#FBFAF8', fontSize: 40 }}>:</Text>
          {/* Seconds */}
          <View style={{ flexDirection: 'row', gap: 1 }}>
            {[...countDownTime?.seconds].map((digit, index) => (
              <Text
                key={index}
                style={{
                  backgroundColor: '#3490de',
                  fontWeight: 'bold',
                  color: '#FBFAF8',
                  fontSize: 30,
                  paddingVertical: 2,
                  paddingHorizontal: 3,
                  borderRadius: 8,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.5,
                  shadowRadius: 6,
                }}
              >
                {digit}
              </Text>
            ))}
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 6 }}>
          <TouchableOpacity onPress={handlePress}>
            <Text
              style={{
                color: 'white',
                backgroundColor: '#3490de',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 'bold',
                paddingVertical: 8,
                paddingHorizontal: 24,
                textAlign: 'center',
                marginRight: 2,
                marginBottom: 2,
              }}
            >
              Check Out Cookie Ninja
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Countdown;
