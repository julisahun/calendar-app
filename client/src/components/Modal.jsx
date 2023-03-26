import { Modal, View, StyleSheet } from 'react-native'

const customModal = ({ visible = false, children }) => {
  return (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
  >
    <View className="flex-1 justify-center items-center">
      <View style={styles.modalView}>
        {children}
      </View>
    </View>
  </Modal>
  )
}

export default customModal

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
})
