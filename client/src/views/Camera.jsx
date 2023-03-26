import { StyleSheet } from 'react-native'

import { Camera, CameraType } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import React, { useState, useEffect, useRef } from 'react'
import View from '../components/View.jsx'
import Button from '../components/Button'

export default function CustomCamera (props) {
  const [hasPermission, setHasPermission] = useState(null)
  const [image, setImage] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
  const cameraRef = useRef(null)

  const flipCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    )
  }

  const takePicture = async () => {
    const photo = await cameraRef.current.takePictureAsync()
  }

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync()
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} flash={flash} ref={cameraRef} >
        <View class="flex-1" />
        <View class="flex flex-row justify-between items-center my-10 mx-5">
          <Button class="rounded-xl w-1/4 text-white p-2" text={'back'} onClick={props.back}/>
          <View class="w-1/3 items-center">
            <Button custom class="rounded-full w-10 h-10 bg-white"onClick={takePicture}/>
          </View>
          <Button class="rounded-xl text-white p-2 w-1/4" text={'flip'} onClick={flipCamera}/>
        </View>
      </Camera>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  camera: {
    flex: 1,
    borderRadius: 20
  }
})
