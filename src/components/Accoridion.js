import React, { useState } from 'react';

const Accordion = ({ items }) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const renderItems = items.map((item, key) => {
        const onClickItem = (key) => {
            setActiveIndex(key);
        }

        return (
            <div key={key} onClick={() => onClickItem(key)}>
                <div 
                    className={`title ${key === activeIndex ? 'active' : ''}`}
                >
                    <i className="dropdown icon"></i>
                    {item.title}
                </div>
                <div className={`content ${key === activeIndex ? 'active' : ''}`}>
                    <p>{item.content}</p>
                </div>
            </div>
        )
    });

    return (
        <div className="ui styled accordion">
            {renderItems}
        </div>
    )
}

export default Accordion;