import React from 'react'
import { FaTrash } from 'react-icons/fa'

const Sidebar = (props) => {
  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`title ${
          note.id === props.currentNote.id ? 'selected-note' : ''
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <h4 className="text-snippet">{note.body.split('/n')[0]}</h4>
        <button
          className="delete-btn"
          onClick={(e) => props.deleteNote(e, note.id)}
        >
            <FaTrash style={{ color: 'white', display: "block"}} className='title-delete' /> 
        </button>
      </div>
    </div>
  ))
  return (
    <section className="pane sidebar">
      <div className="sidebar-header">
        <h3> Notes</h3>
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  )
}

export default Sidebar
