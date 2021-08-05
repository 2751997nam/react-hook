import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = 'https://en.wikipedia.org/w/api.php'

const Search = () => {
    const [term, setTerm] = useState('dark souls');
    const [debounceTerm, setDebounceTerm] = useState(term);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebounceTerm(term);
        }, 500);

        return () => {
            clearTimeout(timerId);
        }
    }, [term]);

    useEffect(() => {
        const find = async () => {
            const { data } = await axios.get(apiUrl, {
                params: {
                    action: 'query',
                    format: 'json',
                    list: 'search',
                    srlimit: 100,
                    origin: '*',
                    srsearch: debounceTerm
                }
            });
            if (data.query && data.query.search) {
                setResults(data.query.search);
            } else {
                setResults([]);
            }
        }
        find();
    }, [debounceTerm]);
    
    // useEffect(() => {
    //     const find = async () => {
    //         const { data } = await axios.get(apiUrl, {
    //             params: {
    //                 action: 'query',
    //                 format: 'json',
    //                 list: 'search',
    //                 srlimit: 100,
    //                 origin: '*',
    //                 srsearch: term
    //             }
    //         });
    
    //         setResults(data.query.search);
    //     }
    //     let timeoutId = 0;
    //     if (term) {
    //         timeoutId = setTimeout(() => {
    //             find();
    //         }, 500);
    //     } else {
    //         setResults([]);
    //     }

    //     return () => {
    //         if (timeoutId) {}
    //         clearTimeout(timeoutId);
    //     }
    // }, [term]);

    const renderItems = results.map((item, key) => {
        return (
            <div key={key} className="item">
                <div className="right floated content">
                    <a
                        className="ui button"
                        target="_blank"
                        rel="noreferrer"
                        href={`https://en.wikipedia.org?curid=${item.pageid}`}
                    >
                        Go
                    </a>
                </div>
                <div className="content">
                    <div className="header">{item.title}</div>
                    <span dangerouslySetInnerHTML={{ __html: item.snippet }}></span>
                </div>
            </div>
        )
    })

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter search term</label>
                    <input type="text" onChange={e => setTerm(e.target.value)} value={term} />
                </div>
            </div>
            <div className="ui celled list">{renderItems}</div>
        </div>
    )
}

export default Search;