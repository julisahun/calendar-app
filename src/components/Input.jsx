import React from 'react'
import { TextInput } from 'react-native'

const Input = (props) => {
  const Styles = {
    borderWidth: 1,
    borderRadius: 5,
    padding: 7,
    ...props.styles
  }
  return (
    <TextInput
      style={{ ...Styles }}
      placeholder={props.placeHolder}
      value={props.value}
      onChangeText={props.onChange}
    />
  )
}

export default Input
