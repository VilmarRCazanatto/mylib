import { BottomListContainer } from './style'

const BottomList = ({height}: {height: number}) => {
    return (
        <BottomListContainer h={height}>
            <select>
                <option>Lerei</option>
                <option>Lido</option>
            </select>
            <button>^</button>
            <ul></ul>
        </BottomListContainer>
    )

}

export default BottomList