import React, { useState, useEffect } from 'react';
import axios from 'axios';
//AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM
const Convert = ({ language, text }) => {
    const [debounceText, setDebounceText] = useState(text);
    const [output, setOutput] = useState('');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebounceText(text) 
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        }
    }, [text]);
    useEffect(() => {
        if (debounceText) {
            axios.post(
                'https://translation.googleapis.com/language/translate/v2',
                {},
                {
                    params: {
                        q: debounceText,
                        target: language.content,
                        key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
                    }
                }
            ).then((res) => {
                const result = res.data;
                if (result.data && result.data.translations && result.data.translations.length) {
                    setOutput(result.data.translations[0].translatedText);
                } else {
                    setOutput('');
                }
            }).catch(error => {
                setOutput('');
            })
        }
    }, [debounceText, language]);

    return (
        <div>
            {output}
        </div>
    )
};

export default Convert;