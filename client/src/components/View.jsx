import { View } from 'react-native'

const CustomView = props => {
  return (
    <View className={props.class} style={props.style}>
      {props.children}
    </View>
  )
}

export default CustomView
