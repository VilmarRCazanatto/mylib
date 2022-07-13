import React, { Dispatch, useEffect, useState } from 'react'
import { SearchHeaderContainer, ExpandInputList, SearchedList, Cover, AddButtonContainer } from './style'
import { Author, Livro } from "./../../types"

const SearchBox = ({ livros, authors, height }: { livros: Livro[], authors: Author[], height: number }) => {
    const [searchState, setSearchState] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<Livro[]>([])

    //Sempre que sai do modo de procura, limpa input
    useEffect(() => {
        if (!searchState) setSearchText("")
    }, [searchState])
    //Procura livros no DB
    useEffect(() => {
        setResult(searchText.trim().length
            ? livros.filter(livro =>
                [livro.title, livro.author_name, livro.release]
                    .join('|')
                    .toLocaleLowerCase()
                    .indexOf(searchText.trim().toLowerCase()) != -1
            )
            : []
        )
    }, [searchText])


    //Procura na Amazon
    const btnClick = async () => {
        if (!searchText.trim().length) return
        setResult([])
        setLoading(true)

        setResult(
            (await fetch(`/api/amazon/search?search_text=${searchText.toLowerCase().split(' ').join('+')
                }`)
                .then((r): Promise<Livro[]> => r.json()))
                .map(livro => ({
                    ...livro,
                    author_name: livro.author.toString(),
                    author: -1,
                    status: -2,
                    will_have: -1
                }))

        )



        setTimeout(setLoading, 500, false)
    }
    const addFromAmazon = (livro: Livro) => {
        let author_id = authors.filter(author => author.name == livro.author_name)[0]

        console.log(author_id)
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
                        value={searchText}
                        onFocus={() => setSearchState(true)}
                        onChange={ev => setSearchText(
                            (ev.target as HTMLInputElement).value
                        )} />
                    <button id="amazonBtn" onClick={btnClick}><img src="/amazon.svg" /></button>
                </div>
                <SearchedList h={height} isLoading={loading}>
                    <div id="loading"></div>
                    <div id="listContainer">
                        <ul>
                            {result.map(livro => (
                                <li key={livro.code}>
                                    <Cover id="cover" bgId={livro.cover} />
                                    <span id="title">{livro.title}</span>
                                    <span id="author">{livro.author_name}</span>
                                    <span id="release">{livro.release}</span>
                                    <div id="btnContainer">
                                        <AddButton
                                            icons_options={{
                                                "-2": "will_read.png",
                                                "-1": "will_read_marked.png",
                                                "1": "reading.png",
                                                "2": "readed.png"
                                            }}
                                            select={{
                                                initial: -2,
                                                clickin: -1,
                                                clickout: -2,
                                            }}
                                            on_click={cur => {
                                                addFromAmazon(livro)
                                            }}
                                            on_hold={cur => console.log("status", cur)} />
                                        <AddButton
                                            icons_options={{
                                                "-1": "will_buy.png",
                                                "1": "will_buy_marked.png",
                                                "2": "have.png",
                                            }}
                                            select={{
                                                initial: -1,
                                                clickin: 1,
                                                clickout: -1,
                                            }}
                                            on_click={cur => console.log("have", cur)}
                                            on_hold={cur => console.log("have", cur)} />
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

type IconsProps = -2 | -1 | 1 | 2
type AddButtonPropsTypes = {
    icons_options: {
        "-2"?: string,
        "-1"?: string,
        "1"?: string,
        "2"?: string
    },
    select: {
        initial: IconsProps,
        clickin: IconsProps,
        clickout: IconsProps,
    },
    on_click: (selected: IconsProps) => void,
    on_hold: (selected: IconsProps) => void
}
const AddButton = ({ icons_options, select, on_click, on_hold }: AddButtonPropsTypes) => {
    const [clickTiming, setClickTiming] = useState<NodeJS.Timeout | number>(-1)
    const [selected, setSelected] = useState(select.initial)
    const [popupShowed, setpopupShowed] = useState(false)

    if (select.clickin == select.clickout) throw new Error("clickin == clickout")

    return (<AddButtonContainer
        bgOptions={icons_options}
        selected={selected}
        popupShowed={popupShowed}>
        <div id="content">
            <button
                id="main"
                onTouchStart={() => setClickTiming(setTimeout(
                    () => {
                        clearTimeout(clickTiming as NodeJS.Timeout)
                        setClickTiming(0)
                        setpopupShowed(true)

                        on_hold(1)
                    },
                    500
                ))}
                onTouchEnd={() => {
                    clearTimeout(clickTiming as NodeJS.Timeout)
                    if (!clickTiming) return
                    if (selected != select.clickin && selected != select.clickout) return

                    let cur = selected == select.clickin ? select.clickout : select.clickin
                    setSelected(cur)
                    on_click(cur)
                }} />
            <div id="all_options">
                {[-2, -1, 1, 2].map(n => {
                    let ic = n as IconsProps
                    if (icons_options[ic]) return (
                        <button
                            onClick={() => {
                                setpopupShowed(false)
                                setSelected(ic)
                                on_hold(ic)
                            }}
                            key={ic} id={`i${ic}`} />
                    )
                })}
            </div>
        </div>
        {popupShowed && <div onClick={() => setpopupShowed(false)} id="foreground" />}
    </AddButtonContainer>)
}

export default SearchBox
