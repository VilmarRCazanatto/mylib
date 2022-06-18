import { Livro } from './../../types'
import { Cover, ReadingCardContainer, StarRating } from './style'

const ReadingCard = ({ livro, hide }: { livro: Livro, hide: boolean }) => {
    return (<>
        <ReadingCardContainer hide={!hide}>
            <h3>{livro.status == -1 ? "Segestão" : "Lendo..."}</h3>
            <div id="card">
                <Cover id="cover" bgId={livro.cover} />
                <h4 id="title">{livro.title}</h4>
                <h5 id="release">{livro.release}</h5>
                <h5 id="author">{livro.author_name}</h5>
                <p id="sinopse">{livro.sinopse}</p>
                <StarRating id="rate" rating={livro.rate}/>
            </div>

        </ReadingCardContainer>
    </>)

}

export default ReadingCard