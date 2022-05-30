import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { SearchHeader, ShelfScroll, ReadingCard, BottomList, Head } from './../components'
import { BottomContainer } from './../styles/style'

const Home: NextPage = () => {

  const [height, setHeight] = useState(0)
  const [livros, setLivros] = useState([]) as [any[], any]

  useEffect(() => {
    (async () => {
      if (typeof window != "undefined" && !height) setHeight(window.innerHeight)

      const res = await fetch('/api/livros').then(r => r.json())
      if (res.status == 200) setLivros(res.livros)

    })()
  }, [])


  return (
    <div id="root_container">
      <Head />
      <SearchHeader livros={[]} />
      <ShelfScroll livros={livros} />

      <BottomContainer h={height}>
        <ReadingCard livro={{...livros[0],author: "Taylor Jankins", sinopse: "Lendária estrela de Hollywood, Evelyn Hugo sempre esteve sob os holofotes ― seja estrelando uma produção vencedora do Oscar, protagonizando algum escândalo ou aparecendo com um novo marido… pela sétima vez. Agora, prestes a completar oitenta anos e reclusa em seu apartamento no Upper East Side, a famigerada atriz decide contar a própria história ― ou sua “verdadeira história” ―, mas com uma condição: que Monique Grant, jornalista iniciante e até então desconhecida, seja a entrevistadora. Ao embarcar nessa misteriosa empreitada, a jovem repórter começa a se dar conta de que nada é por acaso ― e que suas trajetórias podem estar profunda e irreversivelmente conectadas.", rate: 4.6}}/>
        <BottomList height={height}/>
      </BottomContainer>
    </div>
  )
}

export default Home