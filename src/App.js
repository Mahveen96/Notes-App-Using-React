import React, { useEffect, useState } from 'react'
import Sidebar from './Components/Sidebar'
import Editor from './Components/Editor'
import Split from 'react-split'
import { nanoid } from 'nanoid'


const App = () => {
    const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes")) || [])

    const [currentNoteId, setCurrentNoteId] = useState( notes[0] && notes[0].id) || ""

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    const createNewNote = () => {
        const newNote = {
            id: nanoid(),
            body: "#Type your markdown note's title here"
        }
        
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }

    const updateNote = (text) => {
      // keep the modified note at the top of the notes list
      setNotes(oldNotes => {
        const newNotesArray = []
        for(let oldNote of oldNotes) {
            if(oldNote.id === currentNoteId) {
                newNotesArray.unshift({...oldNote, body: text})
            } else {
                newNotesArray.push(oldNote)
            }
        }
        return newNotesArray
      })
    }

    const deleteNote = (e, noteId) => {
        e.stopPropagation()
        setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
    } 

    const findCurrentNote = () => {
        return notes.find(note => {
        return note.id === currentNoteId
        }) || notes[0]
    } 

    return (
        <main>
            {
                notes.length > 0 ?
                <Split
                sizes={[30, 70]}
                direction='horizontal'
                className='split'>

            <Sidebar 
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
            />
            {
                currentNoteId && notes.length > 0 && 
                <Editor 
                updateNote={updateNote}
                currentNote={findCurrentNote()}/>
            }
             </Split>
             : 
            <div className='no-notes'>
                <h1>You have no notes</h1>
                <button className='first-note' onClick={createNewNote}>Create one now</button>
            </div>
}
        </main>
    )
}

export default App