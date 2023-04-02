import React from 'react'
import { Text, View, Input, Icon, EmojiPicker, Button } from '../components/Components.jsx'
import Camera from './Camera.jsx'
import { Image } from 'react-native'

const ItemDetails = ({ navigation, route }) => {
  const [cameraOpen, setCameraOpen] = React.useState(false)
  const [image, setImage] = React.useState(null)
  const openCamera = () => {
    console.log('open camera')
    setCameraOpen(true)
  }
  const closeCamera = () => {
    console.log('close camera')
    setCameraOpen(false)
  }
  const takePicture = (imageTaken) => {
    console.log('take picture')
    setImage('data:image/png;base64,' + imageTaken)
  }

  const cancel = () => {
    navigation.pop()
  }

  const save = () => {
    console.log('save')
  }

  return (
    <View class="h-full w-full">
      <View class="flex-1">
        <View class="flex flex-row mt-10 pl-3 items-center justify-between z-10">
          <View class='w-1/3 flex-row items-center justify-around '>
            <Text class="text-xl">Emoji</Text>
            <EmojiPicker />
          </View>
          <View class='w-2/3 flex-row items-center justify-around'>
            <Text class="w-1/3 text-xl">Name</Text>
            <Input class="w-2/3" />
          </View>
        </View>
        <View class="flex flex-row mt-10 pl-3 h-1/4 items-center justify-between">
          <Text class="text-xl">Item Description</Text>
          <Input multipleLines class="w-1/2 h-full ml-12" />
        </View>
        {image && <Image source={{ uri: image || '' }} style={{ width: 200, height: 200 }} />}
      </View>
      <View class="flex items-center mb-10">
        <Icon name="camera" size={30} onClick={openCamera}/>
      </View>
      <View class="w-full mb-10">
        <View class="flex flex-row justify-around">
          <Button secondary class="rounded-full h-10 w-20" text="Cancel" onClick={cancel}/>
          <Button class="rounded-full h-10 w-20" text="Save" onClick={save}/>
        </View>
      </View>
      {cameraOpen &&
        <View class="absolute h-full w-full">
          <Camera back={closeCamera} shot={takePicture}/>
        </View>
      }
    </View>
  )
}

export default ItemDetails
