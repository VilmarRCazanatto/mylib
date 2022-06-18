import styled from 'styled-components'

export const BottomContainer = styled.div`
    width: 100%;
    height: ${props => `calc(${props.h}px - 106px - 157px)`};
    padding: 10px 10px 0 10px;

    background: var(--primary-color);
    box-shadow: 0 0 20px rgba(0,0,0,.55);

    overflow: hidden;

`

export const InitialLoader = styled.div`
    background: url('/loading.gif');
    position: absolute;
    width: 100px;
    height: 100px;
    top: 40vh;
    left: calc(50vw - 50px);
    background-size: cover;

    :before {
        content: ".myLib";
        position: absolute;
        top: 100px;
        width: 100%;
        text-align: center;
        font-size: 28px;
        font-weight: 900;
    }
`