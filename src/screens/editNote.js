import { useState, useEffect } from "react";
import { View, StyleSheet, Text } from 'react-native';
import CustomButton from '../components/customButton';
import CustomTextInput from '../components/customTextInput';

const EditNote = ({ setCurrentPage, editNote, noteId }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // useEffect(() => {
  //   console.log("Editing note with ID:", noteId);  
  // }, [noteId]);

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Ubah Note</Text>
      <CustomButton 
          backgroundColor="#efefef"
          color="black"
          text="Kembali ke Home"
          width="50%"
          onPress={() => setCurrentPage('home')}
        />
      <CustomTextInput 
        text={newTitle}
        onChange={setNewTitle}
        label="Judul Baru"
        placeholder="Judul"
        numberOfLines={1}
        multiline={false}
      />
      <CustomTextInput 
        text={newDesc}
        onChange={setNewDesc}
        label="Deskripsi Baru"
        placeholder="Deskripsi"
        multiline
        numberOfLines={4}
      />
      <View style={styles.spacerTop}>
        <CustomButton 
          backgroundColor="black"
          color="#fff"
          text="Simpan"
          width="100%"
          onPress={() => {
            editNote(noteId, newTitle, newDesc);
            setCurrentPage('home');
          }}
        />
      </View>
    </View>
  );
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
});

export default EditNote;
