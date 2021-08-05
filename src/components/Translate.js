import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Convert from './Convert';

const items = [
    {
        title: 'English',
        content: 'en'
    },
    {
        title: 'Japanese',
        content: 'ja'
    },
    {
        title: 'Vietnamese',
        content: 'vi'
    }
];

const Translate = () => {
    const [language, setLanguage] = useState(items[0]);
    const [text, setText] = useState('');

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter text</label>
                    <input value={text} onChange={(e) => setText(e.target.value)} />
                </div>
            </div>

            <div>
                <Dropdown title="Select a language" options={items} selected={language} onSelectedChange={setLanguage} />
            </div>

            <hr />
            <h3 className="ui header">Output</h3>
            <Convert text={text} language={language} />
        </div>
    )
}

export default Translate;