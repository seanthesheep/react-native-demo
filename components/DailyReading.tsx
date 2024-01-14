import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native/types';

//* This is a component that makes a request to an API I built with Go (https://github.com/seanthesheep/daily-office-api)
//  It fetches the current reading for the day from the Episcopal Book of Common Prayer based on the 
//  season (e.g. Lent, Advent, Easter, etc.)


interface IDOLProps {
  season: string;
  week: string;
  day: string;
}
const DOLreading = ({ season, week, day }: IDOLProps) => {
  const [gospel, setGospel] = useState<string>('')
  const [lessons, setLessons] = useState<Object>({})
  const [lesson, setLesson] = useState<string>('')

  const fetchReading = async (scripture: string) => {
    const fmt = scripture.toLowerCase().replace(' ', '+')
    try {
      const result = await fetch('https://bible-api.com/' + fmt)
      const data = await result.json()
      const lessonText = data.verses.map((verse: any) => verse.text).join('\n')
      setLesson(lessonText)
    } catch (error) {
      console.log('error ', error)
      return
    }
  }

  useCallback(async () => {
    try {
      const result = await fetch(`https://www.dolapi.com/year-one/${season}/${week}/${day}`)
      let scripture = await result.json()
      setLessons(scripture.lessons)
    } catch (error) {
      console.log('error: ', error)
      return
    }
  }, [])


  return (
    <View>

    </View>
  )
}

export default DOLreading;
