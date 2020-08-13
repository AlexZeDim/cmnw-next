// Import React dependencies.
import React, { useEffect, useMemo, useState } from "react";
// Import the Slate editor factory.
import { createEditor } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'

export default function T () {
    const editor = useMemo(() => withReact(createEditor()), [])
    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{ text: 'A line of text in a paragraph.' }],
        },
    ])

    return (
        <Slate editor={editor} value={value} onChange={value => setValue(value)}>
            <Editable
                onKeyDown={event => {
                    if (event.key === '&') {
                        // Prevent the ampersand character from being inserted.
                        event.preventDefault()
                        // Execute the `insertText` method when the event occurs.
                        editor.insertText("and")
                    }
                }}
            />
        </Slate>
    )
};