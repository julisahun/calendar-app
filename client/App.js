import React from 'react'
import Main from './src/navigation/Main.jsx'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Alert } from 'react-native'
import messaging from '@react-native-firebase/messaging'

export default function App () {
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission()
    const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

    if (enabled) {
      console.log('Authorization status:', authStatus)
    }
  }
  React.useEffect(() => {
    if (requestUserPermission()) {
      messaging().getToken().then(token => console.log(token))
    } else {
      console.log('Permission rejected', authStatus)
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
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
    })
    return unsubscribe
  }, [])

  return (
    <SafeAreaView className='flex-1'>
      <Main />
    </SafeAreaView>
  )
}
