import React from 'react'
import Main from './src/navigation/Main.jsx'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function App () {
  return (
    <SafeAreaView className='flex-1'>
      <Main />
    </SafeAreaView>
  )
}
