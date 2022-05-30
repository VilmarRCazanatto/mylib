import styled from "styled-components"

export const BottomListContainer = styled.div`
    padding-top: 10px;

    select {
        height: 24px;
        margin: 0 0 8px 4px;
        font-size: 22px;
        border: none;
        background: none;
        color: black;
        font-weight: bold;
    }

    button {
        height: 24px;
        width: 24px;
        border: none;
        background: purple;
    }

    ul {
        width: 100%;
        height: ${props => `calc(${props.h}px - 106px - 157px - 20px - 230px - 32px)`};
        background: var(--white-color);

        border-radius: 15px 15px 0 0;
    }

`