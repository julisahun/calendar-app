import React from 'react'
import { TextInput } from 'react-native'

const Input = (props) => {
  const classes = [props.classes || [], 'rounded-lg', 'border-2', 'p-3', 'm-2'].join(' ')

  return (
    <TextInput
      className={classes}
      placeholder={props.placeHolder}
      value={props.value}
      onChangeText={props.onChange}
    />
  )
}

export default Input
