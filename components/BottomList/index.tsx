import { BottomListContainer } from './style'
import { Dispatch, SetStateAction } from 'react'

const BottomList = ({ height, hide, setHide }: { height: number, hide: boolean, setHide: Dispatch<SetStateAction<boolean>> }) => {


    return (
        <BottomListContainer h={height} hide={hide}>
            <select>
                <option>Lerei</option>
                <option>Lido</option>
            </select>
            <button onClick={() => setHide(!hide)}></button>
            <ul></ul>
        </BottomListContainer>
    )

}

export default BottomList