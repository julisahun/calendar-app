import React from 'react'
import View from '../components/View.jsx'
import Text from '../components/Text.jsx'
import Input from '../components/Input.jsx'
import Camera from './Camera.jsx'
import Button from '../components/Button.jsx'
import EmojiPicker from '../components/EmojiPicker.jsx'

const ItemDetails = ({ navigation, route }) => {
  const [cameraOpen, setCameraOpen] = React.useState(false)
  const openCamera = () => {
    console.log('open camera')
    setCameraOpen(true)
  }
  const closeCamera = () => {
    console.log('close camera')
    setCameraOpen(false)
  }

  return (
    <View class="h-full w-full">
      <View class="flex-1">
        <View class="flex flex-row mt-10 pl-3 items-center justify-between">
          <View class='w-1/3 flex-row items-center justify-around'>
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
      </View>
      <View class="flex flex-row justify-center p-10">
        <Button class="rounded-2xl w-1/2 h-10 mb-10" text="Take a picture" onClick={openCamera}/>
      </View>
      {cameraOpen &&
        <View class="absolute h-full w-full">
          <Camera back={closeCamera}/>
        </View>
      }
    </View>
  )
}

export default ItemDetails
