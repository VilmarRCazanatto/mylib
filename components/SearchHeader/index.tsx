import React, { Dispatch, useState } from 'react'
import { SearchHeaderContainer, ExpandInputList, SearchedList, Cover } from './style'
import { Livro } from "./../../types"

const SearchBox = ({ livros }: { livros: Livro[] }) => {
    const [searchState, setSearchState] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [height, setHeight] = useState(0)
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<Livro[]>([])

    const btnClick = async () => {
        if (!searchText.length) return
        setResult([])
        setLoading(true)

        setResult(await fetch(`/api/amazon/search?search_text=${searchText.split(' ').join('+').toLowerCase()}`)
            .then(r => r.json()))

        setTimeout(setLoading, 500, false)
    }


    if (typeof window != "undefined") {
        if (!height) window.onload = () => {
            if (!height) setHeight(window.innerHeight)
        }
    }

    return (
        <SearchHeaderContainer>
            <h1 onClick={() => setSearchState(false)}>.myLib</h1>
            <ExpandInputList h={height} isSearching={searchState}>
                <div>
                    <div id="input_icon" onClick={() => setSearchState(false)}>
                        <img src="/back_icon.png" alt="Icone" />
                        <img src="/icon.png" alt="Icone" />
                    </div>
                    <input placeholder="Busque seu livro"
                        onFocus={() => setSearchState(true)}
                        onKeyUp={ev => setSearchText((ev.target as HTMLInputElement).value)} />
                    <button onClick={btnClick}><img src="/amazon.svg" /></button>
                </div>
                <SearchedList h={height} isLoading={loading}>
                    <div id="loading"></div>
                    <div style={{ paddingTop: '15px' }}>
                        <ul>
                            {result.map(livro => (
                                <li key={livro.code}>
                                    <Cover bgId={livro.cover} />
                                    <span className="title">{livro.title}</span>
                                    <span className="author">{livro.author}</span>
                                    <span className="release">{livro.release}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </SearchedList>


            </ExpandInputList>
        </SearchHeaderContainer>
    )

}

export default SearchBox