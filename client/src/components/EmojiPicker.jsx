import View from './View.jsx'
import React from 'react'
import EmojiSelector from 'react-native-emoji-selector'
const EmojiPicker = (onSelect) => {
  const [open, setOpen] = React.useState(false)
  return (
    <View class='mr-2'>
      <View class="bg-gray-200 rounded-2xl w-10 h-10 flex items-center justify-center" onClick={() => { setOpen(!open) }}/>
      {open &&
      <View class="mt-20 absolute w-64 h-72 bg-white">
        <EmojiSelector onEmojiSelected={emoji => onSelect}
          showSearchBar={true}
          showTabs={true}
          showHistory={true}
          showSectionTitles={true}
          />
      </View>
      }
    </View>
  )
}

export default EmojiPicker
