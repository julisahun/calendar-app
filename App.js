import React from 'react'
import Main from './src/navigation/Main.jsx'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './src/styles/styles.js'

export default function App () {
  return (
    <SafeAreaView style={styles.flex1}>
      <Main />
    </SafeAreaView>
  )
}
