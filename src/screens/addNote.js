import { useState } from "react"

import { View, StyleSheet, Text } from 'react-native'
import CustomButton from '../components/customButton'
import CustomTextInput from '../components/customTextInput'

const AddNote = ({ setCurrentPage, addNote }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Tambahkan Note</Text>
      <CustomButton 
          backgroundColor="#efefef"
          color="black"
          text="Kembali ke Home"
          width="50%"
          onPress={() => setCurrentPage('home')}
        />
      <CustomTextInput 
        text={title}
        onChange={setTitle}
        label="Judul"
        placeholder="Judul"
        numberOfLines={1}
        multiline={false}
      />
      <CustomTextInput 
        text={desc}
        onChange={setDesc}
        label="Deskripsi"
        placeholder="Deskripsi"
        multiline
        numberOfLines={4}
      />
      <View style={styles.spacerTop}>
        <CustomButton 
          backgroundColor="black"
          color="#fff"
          text="Simpan"
          width="50%"
          onPress={() => {
            addNote(title, desc)
            setCurrentPage('home')
          }}
        />
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
  },
  pageTitle: {
    textAlign: 'center',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
    marginVertical: 25,
    padding: 5,
  },
  spacerTop: {
    marginTop: 30,
  }
})

export default AddNote