import React from 'react'
import Main from './src/navigation/Main.jsx'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import messaging from '@react-native-firebase/messaging'

export default function App () {
  const requestUserPermission = async () => {
    await messaging().requestPermission()
  }
  React.useEffect(() => {
    if (requestUserPermission()) {
      messaging().getToken().then(token => AsyncStorage.setItem('token', token))
    }

    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification
          )
        }
      })
    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification
      )
    })

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage)
    })

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage))
    })
    return unsubscribe
  }, [])

  return (
    <SafeAreaView className='flex-1'>
      <Main />
    </SafeAreaView>
  )
}
