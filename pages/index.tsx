import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'

import { SearchBox, ShelfScroll, Head } from './../components'

type Livro = {
  title: string,
  img: string,
  author: string,
  release: number
}

const Home: NextPage = () => {
  const [searchText, setSearchText] = useState("")
  const [data, setData]: [Livro[], any] = useState([])

  return (
    <div>
      <Head />

      <input onKeyUp={ev => {
        setSearchText((ev.target as HTMLInputElement).value)
      }}/>
      <button onClick={async () => {
        setData(await fetch(`/api/amazon?search_text=${searchText.split(' ').join('+')}`).then(r => r.json()))

        console.log(data)
      }}>Buscar</button>

      {data.map(livro => {
        return (
          <div key={livro.title}>
            <hr/>
            <p>{livro.title}</p>
            <img src={livro.img}/>
            <p>Autor: {livro.author}</p>
            <p>Lançamento: {livro.release}</p>
          </div>
        )
      })}
      
    </div>
  )
}

export default Home
