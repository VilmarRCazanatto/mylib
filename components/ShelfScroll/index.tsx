import type { NextPage } from 'next'
import Head from 'next/head'
import { ShelfScrollContainer } from './style'

import { Livro } from "./../../types"

const ShelfScroll = ({ livros }: { livros: Livro[] | undefined }) => {

    return (
        <ShelfScrollContainer>
            <h2>Shelf</h2>
            <div id="scroll">
                <div id="content">
                    {livros?.map(livro => (<img key={livro.code} src={`https://m.media-amazon.com/images/I/${livro.cover}.jpg`} />))}
                </div>
            </div>
        </ShelfScrollContainer>
    )

}

export default ShelfScroll