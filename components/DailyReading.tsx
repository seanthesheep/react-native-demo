import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IDOLProps {
  season: string;
  week: string;
  day: string;
}

const DOLreading = ({ season, week, day }: IDOLProps) => {
  const [psalms, setPsalms] = useState<{ morning: string[]; evening: string[] }>({ morning: [], evening: [] });

  const fetchReading = async (scripture: string) => {
    const fmt = scripture.toLowerCase().replace(' ', '+');
    try {
      const result = await fetch('https://bible-api.com/psalms' + fmt);
      const data = await result.json();

      if (data.verses) {
        return data.verses.map((verse: any) => verse.text).join('\n');
      } else {
        console.log('No verses found in the API response' + fmt);
        return '';
      }
    } catch (error) {
      console.log('Error fetching Bible API:', error);
      return '';
    }
  };

  const fetchDOLApi = useCallback(async () => {
    try {
      const result = await fetch(`https://www.dolapi.com/year-two/${season}/${week}/${day}`);
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}: https://www.dolapi.com/year-two/${season}/${week}/${day}`);
      }

      const scripture = await result.json();
      if (!scripture.psalms) {
        throw new Error('No psalms found in the response.');
      }

      const morningPsalms = await Promise.all(scripture.psalms.morning.map(fetchReading));
      const eveningPsalms = await Promise.all(scripture.psalms.evening.map(fetchReading));

      setPsalms({ morning: morningPsalms, evening: eveningPsalms });
    } catch (error) {
      console.log('Error fetching or parsing DOL API response:', error);
    }
  }, [season, week, day]);

  useEffect(() => {
    fetchDOLApi();
  }, [fetchDOLApi]);

  return (
    <ScrollView>
      <View>
        <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 24, textAlign: 'center', marginTop: 20 }}>
          {`Psalms for ${day}, Week of ${week}, ${season} `}
        </Text>
        {psalms.morning.length > 0 && (
          <View>
            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18, marginTop: 10 }}>Morning Psalms</Text>
            {psalms.morning.map((psalm, index) => (
              <Text style={{ color: '#fff' }} key={index}>{psalm}</Text>
            ))}
          </View>
        )}
        {psalms.evening.length > 0 && (
          <View>
            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18, marginTop: 10 }}>Evening Psalms</Text>
            {psalms.evening.map((psalm, index) => (
              <Text style={{ color: '#fff' }} key={index}>{psalm}</Text>
            ))}
          </View>
        )}
        <TouchableOpacity onPress={() => fetchDOLApi()}>
          <Text style={{ color: 'blue', textAlign: 'center', marginTop: 20 }}>Fetch Again</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DOLreading;
