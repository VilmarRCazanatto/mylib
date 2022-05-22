import styled from 'styled-components'

export const SearchHeaderContainer = styled.header`
    padding: 10px;
    background-color: var(--primary-color);
    box-shadow: 0 0 20px rgba(0,0,0,.7);

    h1 {
        width: 100%;
        height: 28px;
        text-align: center;
        font-size: 26px;
        line-height: 26px;
        margin-bottom: 8px;
    }

`

export const ExpandInputList = styled.div`
    position: relative;
    width: : 100%;
    height: ${props => props.isSearching ? `calc(${props.height}px - 20px - 28px - 8px)` : "var(--elem-height)"};
    background-color: var(--white-color);
    border-radius: calc(var(--elem-height)/2);
    box-shadow: 0 0 8px rgba(0,0,0,.4);
    overflow: hidden;        

    --elem-height: 50px;

    div {
        display: flex;
    }

    input {
        position: relative;
        width: calc(100% - 70px);
        height: var(--elem-height);
        padding-left: 20px;
        border: none;
        background: none;
        font-size: 18px;   
    }
    

    button {
        position: relative;
        height: var(--elem-height);
        width: 90px;
        background: none;
        border: none;
        padding: 12px 16px 1px 5px;
    }
    button:after {
        top: 0;
        left: -15px;
        content: "|";
        font-size: calc(var(--elem-height) * .733);
        line-height: var(--elem-height);
        text-align: right;
        color: gray;
        position: absolute;
        height: var(--elem-height);
        width: 15px;
        background: var(--white-color);
    }
    button img {
        width: 100%;
        height: 100%;
        cursor: pointer;
    }

`