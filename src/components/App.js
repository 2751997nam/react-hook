import React, { useState } from 'react';
import Accordion from './Accoridion';
import Search from './Search';
import Dropdown from './Dropdown';
import Translate from './Translate';
import Route from './Route';
import Header from './Header';

const items = [
    {
        title: 'what is react?',
        content: 'js framework'
    },
    {
        title: 'why use react?',
        content: 'It is popular'
    },
    {
        title: 'How do you use react',
        content: 'By creating components'
    }
];


const App = () => {
    const [selected, setSelected] = useState(items[0]);
    return (
        <div style={{ marginTop: "10px" }} >
            <Header />
            <Route path="/" name="home">
                <Accordion items={items} />
            </Route>
            <Route path="/dropdown" name="dropdown">
                <Dropdown 
                    label="Select a question" 
                    options={items} 
                    selected={selected} 
                    onSelectedChange={setSelected}
                />
            </Route>
            <Route path="/search" name="search">
                <Search/>
            </Route>
            <Route path="/translate" name="translate">
                <Translate/>
            </Route>
        </div>
    )
}

export default App;