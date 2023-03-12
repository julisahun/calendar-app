import React from 'react'
import { View } from 'react-native'
import { Calendar } from 'react-native-calendars'

const CalendarView = () => {
  return (
    <View className='p-10'>
      <Calendar
        markedDates={{
          '2023-03-16': { selected: false, marked: true, selectedColor: 'blue' },
          '2023-03-17': { marked: true },
          '2023-03-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
          '2023-03-19': { disabled: true, disableTouchEvent: true }
        }}
      />
    </View>
  )
}

export default CalendarView
