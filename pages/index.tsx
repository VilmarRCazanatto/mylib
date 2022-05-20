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
  const [data, setData]: [Livro[], React.Dispatch<Livro[]>] = useState([] as Livro[])

  return (
    <div>
      <Head />

      <h1>ola mundo</h1>
      
    </div>
  )
}

export default Home