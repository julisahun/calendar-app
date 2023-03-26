import React from 'react'
import { View } from 'react-native'
import { Calendar } from 'react-native-calendars'

const CalendarView = (props) => {
  return (
    <View>
      <Calendar
        markedDates={{
          '2023-03-16': { selected: false, marked: true, selectedColor: 'blue' },
          '2023-03-17': { marked: true },
          '2023-03-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
          '2023-03-19': { disabled: true, disableTouchEvent: true }
        }}
        onDayPress={props.onClick}
        firstDay={1}
        style={{
          padding: 20
        }}
      />
    </View>
  )
}

export default CalendarView
