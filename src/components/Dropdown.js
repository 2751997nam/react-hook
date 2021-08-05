import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ title, options, selected, onSelectedChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const onBodyClick = (event) => {
            if (ref && ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.body.addEventListener('click', onBodyClick);

        return () => {
            document.body.removeEventListener('click', onBodyClick);
        };
    }, []);

    const renderOptions = options.map((option, key) => {
        if (option.title === selected.title) {
            return null;
        }
        return (
            <div key={key} className="item" onClick={() => onSelectedChange(option)}>
                {option.title}
            </div>
        );
    });

    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">{title}</label>
                <div 
                    className={`ui selection dropdown ${isOpen ? 'visible active' : ''}`}
                    onClick={() => {setIsOpen(!isOpen)}}
                >
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.title}</div>
                    <div className={`menu ${isOpen ? 'visible transition' : ''}`}>
                        {renderOptions}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dropdown;