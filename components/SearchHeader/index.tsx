import { useState } from 'react'
import { SearchHeaderContainer, ExpandInputList } from './style'

const SearchBox = () => {
    const [searchState, setSearchState] = useState(false)
    const [height, setHeight] = useState(0)

    if (typeof window != "undefined") {
        if (!height) setHeight(window.innerHeight)        
    }
    return (
        <SearchHeaderContainer>
            <h1>.myLib</h1>
            <ExpandInputList height={height} isSearching={searchState}>
                <div>
                    <input placeholder="Busque seu livro"
                        onFocus={() => setSearchState(true)}
                        onBlur={() => setSearchState(false)}/>
                    <button><img src="/amazon.svg" /></button>
                </div>
            </ExpandInputList>
        </SearchHeaderContainer>
    )

}

export default SearchBox