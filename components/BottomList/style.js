import styled from "styled-components"

export const BottomListContainer = styled.div`
    position: relative;
    padding-top: 10px;

    select {
        position: absolute;
        top: 7px;
        left: 5px;
        height: 24px;
        font-size: 22px;
        border: none;
        background: none;
        color: black;
        font-weight: bold;

        appearance: none;
    }

    button {
        position: absolute;
        top: 0;
        right: 10px;
        height: 40px;
        width: 30px;
        border: none;
       
        background: url(/arrow.svg);
        background-size: 100%;
        background-position: center;

        transform: ${props => `rotate(${props.hide ? 0 : -180}deg)`};

    }

    ul {
        width: 100%;
        height: ${props => `calc(${props.h}px - 106px - 157px - 10px - 230px - 10px - 30px + 240px)`};
        margin-top: 30px;
        background: var(--white-color);

        border-radius: 15px 15px 0 0;
    }

`