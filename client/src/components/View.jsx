import { View, TouchableNativeFeedback } from 'react-native'

const CustomView = (props) => {
  const innerView = (
      <View className={props.class} style={props.style}>
        {props.children}
      </View>)
  if (props.onClick) {
    return (
    <TouchableNativeFeedback onPress={props.onClick}>
      {innerView}
    </TouchableNativeFeedback>
    )
  } else {
    return innerView
  }
}

export default CustomView
