import styled from 'styled-components'

export const BottomContainer = styled.div`
    width: 100%;
    height: ${props => `calc(${props.h}px - 106px - 157px)`};
    padding: 10px 10px 0 10px;

    background: var(--primary-color);
    box-shadow: 0 0 20px rgba(0,0,0,.55);

`