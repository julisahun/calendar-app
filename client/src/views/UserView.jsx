import React from 'react'
import Calendar from '../components/Calendar.jsx'
import View from '../components/View.jsx'
import Text from '../components/Text.jsx'
import Modal from '../components/Modal.jsx'
import Button from '../components/Button.jsx'
import api from '../api/api.js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const UserView = ({ navigation, route }) => {
  const createItem = () => {
    navigation.push('ItemDetails')
  }
  const [selected, setSelected] = React.useState()
  const [modalVisible, setModalVisible] = React.useState(false)
  const [events, setEvents] = React.useState({})

  React.useEffect(() => {
    const { id } = route.params
    console.log(id)
    const asyncCall = async () => {
      api.get(`/events/${id}`).then(response => {
        setEvents(response.data)
      })
    }
    asyncCall()
  }, [])

  const selectDay = (day) => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <View>
      <View class="items-center mt-10">
        <Text class="text-2xl">{route.params.name}</Text>
      </View>
      <View class="mt-10">
        <Calendar onClick={selectDay} />
      </View>
      <View class="flex flex-row justify-between p-10">
        <Button class="rounded-xl w-1/5" text="notas"/>
        <Button class="rounded-full h-10 w-10" secondary text="+" onClick={createItem}/>
        <Button class="rounded-full w-1/5" text="chat"/>
      </View>
      <Modal visible={modalVisible} >
        <Text>Hello World!</Text>
        <Button class='h-10 rounded-xl px-5 mt-5' text='Close' onClick={closeModal} />
      </Modal>
    </View>
  )
}

export default UserView
