import { Text } from 'react-native'

const CustomText = props => {
  return (
    <Text className={props.class} style={props.style}>
      {props.children}
    </Text>
  )
}

export default CustomText
