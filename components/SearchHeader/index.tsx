import React, { Dispatch, useEffect, useState } from 'react'
import { SearchHeaderContainer, ExpandInputList, SearchedList, Cover, AddButton } from './style'
import { Livro } from "./../../types"

const SearchBox = ({ livros, height }: { livros: Livro[], height: number }) => {
    const [searchState, setSearchState] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<Livro[]>([])

    const btnClick = async () => {
        if (!searchText.trim().length) return
        setResult([])
        setLoading(true)

        setResult(
            (await fetch(`/api/amazon/search?search_text=${searchText.split(' ').join('+')}`)
            .then((r): Promise<Livro[]> => r.json()))
            .map(livro => ({
                ...livro,
                author_name: livro.author.toString(),
                author: -1
            }))
            
            )

        

        setTimeout(setLoading, 500, false)
    }

    useEffect(() => {
        if (!searchState) setSearchText("")
    }, [searchState])
    useEffect(() => {
        setResult( searchText.trim().length
            ? livros.filter(livro =>
                [livro.title, livro.author_name, livro.release]
                    .join('|')
                    .toLocaleLowerCase()
                    .indexOf(searchText) != -1
            )
            : [] 
        )
    }, [searchText])

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
                        value={searchText}
                        onFocus={() => setSearchState(true)}
                        onChange={ev => setSearchText(
                            (ev.target as HTMLInputElement)
                            .value
                            .toLowerCase())} />
                    <button id="amazonBtn" onClick={btnClick}><img src="/amazon.svg" /></button>
                </div>
                <SearchedList h={height} isLoading={loading}>
                    <div id="loading"></div>
                    <div style={{ paddingTop: '15px' }}>
                        <ul>
                            {result.map(livro => (
                                <li key={livro.code}>
                                    <Cover id="cover" bgId={livro.cover} />
                                    <span id="title">{livro.title}</span>
                                    <span id="author">{livro.author_name}</span>
                                    <span id="release">{livro.release}</span>
                                    <div id="btnContainer">
                                        <AddButton options={["will_read.png", "reading.png"]} select={0}/>
                                        <AddButton options={["will_buy.png", "have.png"]} select={0} />
                                    </div>
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