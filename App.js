import { useState } from "react";
import Home from "./src/screens/home";
import AddNote from "./src/screens/addNote";
import EditNote from "./src/screens/editNote";

const CurrentPageWidget = ({ currentPage, noteList, setCurrentPage, noteId, setNoteId, addNote, deleteNote, editNote }) => {
  // console.log("Current Page:", currentPage);  
  // console.log("Current Note ID:", noteId);    
  
  switch (currentPage) {
    case 'home':
      return (
        <Home
          noteList={noteList}
          setCurrentPage={setCurrentPage}
          deleteNote={deleteNote}
          setNoteId={setNoteId}
        />
      );
    case 'add':
      return <AddNote setCurrentPage={setCurrentPage} addNote={addNote} />;
    case 'edit':
      return <EditNote setCurrentPage={setCurrentPage} editNote={editNote} noteId={noteId} />;
    default:
      return (
        <Home
          noteList={noteList}
          setCurrentPage={setCurrentPage}
          deleteNote={deleteNote}
          setNoteId={setNoteId}
        />
      );
  }
}

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [noteList, setNoteList] = useState([
    {
      id: 1,
      title: 'Note pertama',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    },
    {
      id: 2,
      title: 'Note kedua',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    },
  ]);
  const [noteId, setNoteId] = useState(null);

  const addNote = (title, desc) => {
    const id = noteList.length > 0 ? noteList[noteList.length - 1].id + 1 : 1;
    // append noteList lama + note baru
    setNoteList([
      ...noteList, 
      {
        id,
        title,
        desc,
      }
    ]);
  }

  const deleteNote = (noteId) => {
    const newNoteList = noteList.filter((note) => note.id !== noteId);
    setNoteList(newNoteList);
  }

  const editNote = (noteId, newTitle, newDesc) => {
    const editedNoteList = noteList.map((note) => {
      if (note.id === noteId) {
        return {
          ...note, // copy note yg mau di-edit baru diganti valuenya
          title: newTitle,
          desc: newDesc
        };
      }
      return note;
    });
    setNoteList(editedNoteList);
  }

  return (
    <CurrentPageWidget
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      setNoteId={setNoteId}
      noteList={noteList}
      addNote={addNote}
      deleteNote={deleteNote}
      editNote={editNote}
      noteId={noteId}
    />
  );
}

export default App;
