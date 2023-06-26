import Icon from 'react-native-vector-icons/FontAwesome'
import { View } from './Components.jsx'

const CustomIcon = ({ name, size, onClick, ...props }) => {
  return (
    <View onClick={onClick}>
      <Icon name={name} size={size} className={props.class}/>
    </View>
  )
}

export default CustomIcon
