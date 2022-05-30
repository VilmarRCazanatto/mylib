import { Livro } from './../../types'
import { Cover, ReadingCardContainer } from './style'

const ReadingCard = ({ livro }: { livro: Livro }) => {
    let { sinopse } = livro
    
    sinopse = sinopse

    return (<>
        <ReadingCardContainer>
            <h3>Lendo...</h3>
            <div id="card">
                {livro && (<>
                    <Cover id="cover" bgId={livro.cover} />
                    <h4 id="title">{livro.title}</h4>
                    <h5 id="release">{livro.release}</h5>
                    <h5 id="author">{livro.author}</h5>
                    <p id="sinopse">{sinopse}</p>
                    <span id="rate">{livro.rate}</span>
                </>)}
            </div>

        </ReadingCardContainer>
    </>)

}

export default ReadingCard