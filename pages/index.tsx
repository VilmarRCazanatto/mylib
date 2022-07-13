//EXTERNAL
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

//TYPES
import { Author, AuthorsAPI_ResponseType, Livro, LivrosAPI_ResponseType } from './../types'

//COMPONENTS
import { SearchHeader, ShelfScroll, ReadingCard, BottomList, Head } from './../components'
import { BottomContainer, InitialLoader } from './../styles/style'


const Home: NextPage = () => {

  const [allLoaded, setAllLoaded] = useState(false)
  const [height, setHeight] = useState(0)
  const [livros, setLivros] = useState<Livro[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const [isListHide, setIsListHide] = useState(true)

  const readingBookFilter = (livros: Livro[]): Livro => {
    let reading = livros.filter(
      livro => Math.floor(livro.status) == 1
    )[0]

    if (!reading) {
      let will_read = livros.filter(livro => livro.status == -1)
      reading = will_read[Math.floor(Math.random() * will_read.length)]
    }

    return reading
  }

  useEffect(() => {
    (async () => {
      if (typeof window != "undefined") setHeight(window.innerHeight)

      let livro_res = await fetch('/api/livros').then((r): Promise<LivrosAPI_ResponseType> => r.json())
      if (livro_res.status != 200 || !livro_res.livros) return

      let author_res = await fetch('/api/livros/authors').then((r): Promise<AuthorsAPI_ResponseType> => r.json())
      if (author_res.status != 200 || !author_res.authors) return

      let author_names = author_res.authors.map(author => author.name)
      setLivros(livro_res.livros.map(livro => ({
        ...livro,
        author_name: author_names[livro.author - 1]
      })))
      
      setAuthors(author_res.authors)


    })()
  }, [])


  //Verificar se todos dados necessarios ja foram carregados
  useEffect(() => {
    if  (!height) return
    if (!livros.length) return

    setAllLoaded(true)
  },[livros, height])


  return (
    <div id="root_container">
      <Head />
      {allLoaded
      ? (<>
        <SearchHeader livros={livros} authors={authors} height={height} />
        <ShelfScroll livros={livros} />
        <BottomContainer h={height}>
          <ReadingCard hide={isListHide} livro={readingBookFilter(livros)} />
          <BottomList height={height} hide={isListHide} setHide={setIsListHide} />
        </BottomContainer>
      </>)
      : (<>
        <InitialLoader/>
      </>)}
    </div>
  )
}

export default Home