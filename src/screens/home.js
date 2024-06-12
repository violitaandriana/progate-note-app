import { useEffect, useState } from "react"
import { FlatList, StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { SearchBar } from 'react-native-elements'

import CustomButton from '../components/customButton';
import starIcon from '../../assets/star.png';
import starFillIcon from '../../assets/star-fill.png';

const NoteCard = ({ item, setCurrentPage, setNoteId, deleteNote }) => {
  const noteId = item.id;
  const [star, setStar] = useState(starIcon);

  const updateStar = () => {
    setStar((prevStar) => (prevStar === starIcon ? starFillIcon : starIcon));
    console.log(star)
  }

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        {item.title}
        <Text onPress={updateStar}>
          <Image source={star} />
        </Text>
      </Text>
      <Text style={styles.cardDesc}>{item.desc}</Text>
      <View style={styles.buttons}>
        <CustomButton
          backgroundColor="black"
          color="white"
          text="Ubah"
          fontSize={12}
          width={100}
          onPress={() => {
            setNoteId(noteId);
            setCurrentPage('edit');
          }}
        />
        <CustomButton
          backgroundColor="#D82148"
          color="#fff"
          text="Hapus"
          fontSize={12}
          width={100}
          onPress={() => {
            setNoteId(noteId);
            deleteNote(noteId);
          }}
        />
      </View>
    </View>
  );
}

const Home = ({ noteList, setCurrentPage, deleteNote, setNoteId }) => {
  const [filteredNote, setFilteredNote] = useState([])
  const [text, setText] = useState([])

  // inisialisasi
  useEffect(() => {
    setFilteredNote(noteList);
  }, [noteList]);

  const searchNote = (event) => {
    let text = event.toLowerCase()
    let filteredNote = noteList.filter((note) => {
      return note.title.toLowerCase().match(text)
    })
    setFilteredNote(filteredNote)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Note App</Text>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={(event) => {
          if (event) {
            searchNote(event)
            setText(event)
          }
          else {
            setFilteredNote(noteList)
          }
        }}
        value={text}
        style={styles.searchBar}
        lightTheme
        round
      />
      <CustomButton
        backgroundColor="black"
        color="white"
        text="Tambahkan Note"
        width="50%"
        onPress={() => setCurrentPage('add')}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredNote.length > 0 ? filteredNote : noteList}
        renderItem={({ item }) => (
          <NoteCard
            item={item}
            setCurrentPage={setCurrentPage}
            deleteNote={deleteNote}
            setNoteId={setNoteId}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
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
  title: {
    textAlign: 'center',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
    marginVertical: 25,
    padding: 5,
  },
  card: {
    padding: 10,
    marginVertical: 15,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
  },
  cardTitle: {
    fontWeight: '600',
    color: 'black',
    fontSize: 16,
    marginBottom: 5,
    display: 'flex',
    justifyContent: 'space-between',
    gap: 2,
  },
  cardDesc: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  buttons: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 4,
  },
  searchBar: {
    marginVertical: 15,
  },
});

export default Home;
