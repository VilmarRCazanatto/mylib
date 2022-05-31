import { Livro } from './../../types'
import { Cover, ReadingCardContainer } from './style'

const ReadingCard = ({ livro, hide }: { livro: Livro, hide: boolean}) => {
    return (<>
        <ReadingCardContainer hide={!hide}>
            <h3>Lendo...</h3>
            <div id="card">
                {livro && (<>
                    <Cover id="cover" bgId={livro.cover} />
                    <h4 id="title">{livro.title}</h4>
                    <h5 id="release">{livro.release}</h5>
                    <h5 id="author">{livro.author}</h5>
                    <p id="sinopse">{livro.sinopse}</p>
                    <span id="rate">{livro.rate}</span>
                </>)}
            </div>

        </ReadingCardContainer>
    </>)

}

export default ReadingCard