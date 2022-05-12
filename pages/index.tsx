import type { NextPage } from 'next'
import Head from 'next/head'

import { SearchBox, ShelfScroll } from './../components'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>MyLib</title>
        <meta name="description" content="Aplicação para getenciar livros." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h4>API production</h4>
      <br/>
      <a href="/api/livros">Goto API</a>
      <br/>
      <p>GET => pegar todos os livros</p>
      <p>POST => adicioar livro</p>

    </div>
  )
}

export default Home
