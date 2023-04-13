import React, { useState } from 'react'
import ReactMde from 'react-mde'
import ReactMarkdown from 'react-markdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

const loadSuggestions = (text) => {
  return new Promise((accept, reject) => {
    setTimeout(() => {
      const suggestions = [
        {
          preview: 'Andre',
          value: '@andre',
        },
        {
          preview: 'Angela',
          value: '@angela',
        },
        {
          preview: 'David',
          value: '@david',
        },
        {
          preview: 'Louise',
          value: '@louise',
        },
      ].filter((i) => i.preview.toLowerCase().includes(text.toLowerCase()))
      accept(suggestions)
    }, 250)
  })
}
const Editor = ({ currentNote, updateNote }) => {
  const [selectedTab, setSelectedTab] = useState('write')

  const save = async function* (data) {
    // Promise that waits for "time" milliseconds
    const wait = function (time) {
      return new Promise((a, r) => {
        setTimeout(() => a(), time)
      })
    }

    await wait(2000)
    // yields the URL that should be inserted in the markdown
    yield 'https://picsum.photos/300'
    await wait(2000)
    return true
  }

  return (
    <section className="pane editor">
      <ReactMde
        value={currentNote.body}
        onChange={updateNote}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(<ReactMarkdown source={markdown} />)
        }
        loadSuggestions={loadSuggestions}
        childProps={{
          writeButton: {
            tabIndex: -1,
          },
        }}
        paste={{
          saveImage: save,
        }}
      />
    </section>
  )
}

export default Editor
