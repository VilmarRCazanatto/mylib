import styled from 'styled-components'

const gridPosition = ({ x, y, width, height }) => () => `
    grid-column-start: ${x + 1};
    grid-row-start: ${y + 1};
    grid-column-end: ${x + 1 + width};
    grid-row-end: ${y + 1 + height};
`

export const SearchHeaderContainer = styled.header`
    --elem-height: 50px;

    position: relative;
    padding: 10px;
    background-color: var(--primary-color);
    box-shadow: 0 0 20px rgba(0,0,0,.7);
    height: calc(var(--elem-height) + 20px + 28px + 8px);

    z-index: 8;

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
    width: 100%;
    height: ${props => props.isSearching ? `calc(${props.h}px - 20px - 28px - 8px)` : "var(--elem-height)"};
    background-color: var(--white-color);
    border-radius: calc(var(--elem-height)/2);
    box-shadow: 0 0 8px rgba(0,0,0,.4);
    overflow: hidden;        

    #input_icon {
        position: absolute;
        height: calc(var(--elem-height) - 12px);
        width: calc(var(--elem-height) - 12px);
        margin: 6px;
        background: #c7ede6;
        border-radius: 50%;
        box-shadow: inset 0 0 7px rgba(0,0,0,.3);
        overflow: hidden;

        img {
            position: relative;
            height: 100%;
        }
        img:nth-child(1){
            margin-left: ${props => props.isSearching ? '0px' : 'calc(12px - var(--elem-height))'};
        }
    }

    div {
        display: flex;
    }

    input {
        position: relative;
        width: calc(100% - 70px - var(--elem-height));
        margin-left: var(--elem-height);
        height: var(--elem-height);
        border: none;
        background: none;
        font-size: 18px;   
    }
    

    #amazonBtn {
        position: relative;
        height: var(--elem-height);
        width: 90px;
        background: none;
        border: none;
        padding: 12px 16px 1px 5px;
    }
    #amazonBtn:after {
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
    #amazonBtn img {
        width: 100%;
        height: 100%;
        cursor: pointer;
    }

`

export const SearchedList = styled.div`
    position: relative;
    width: calc(100% - 30px);
    margin: 0 15px 15px 15px;
    height: ${props => `calc(${props.h}px - 20px - 28px - 8px - var(--elem-height) - 15px)`};
    border-top: 1px solid #8f8f8f;
    overflow-x: hidden;
    overflow-y: scroll;

    #loading {
        --div-size: ${props => props.isLoading ? '80px' : '0px'};

        position: absolute;
        top: calc(45% - var(--div-size) / 2);
        left: calc(50% - var(--div-size) / 2);
        width: var(--div-size);
        height: var(--div-size);
        margin: unset;
        border-radius: 50%;
        background: var(--white-color) url("/loading.gif");
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: 70%;
    }
    
    li {
        list-style: none;
        display: grid;
        width: 100%;
        height: 100px;
        grid-template-columns: 70px 1fr 30px;
        grid-template-rows: 26px 20px 1fr;
        grid-gap: 0 5px;

        margin-bottom: 10px;

        span {overflow: hidden}

        #cover {
            ${props => gridPosition({x: 0, y: 0, width: 1, height: 3})}
        }
        #title {
            ${props => gridPosition({x: 1, y: 0, width: 2, height: 1})}

            font-size: 20px;
            font-weight: 600;
        }
        #author {
            ${props => gridPosition({x: 1, y: 1, width: 1, height: 1})}
        }
        #release {
            ${props => gridPosition({x: 2, y: 1, width: 1, height: 1})}
        }
        #btnContainer{
            ${props => gridPosition({x: 1, y: 2, width: 2, height: 1})}
            padding-bottom: 5px; 
            align-items: end;
        }
    }
`

export const Cover = styled.div`
    width: 70px;
    height: 100px;
    background: ${props => `url("https://m.media-amazon.com/images/I/${props.bgId}.jpg")`};
    background-size: cover;
    background-position: 50%;
`

export const AddButton = styled.button`
    height: 30px;
    width: 30px;
    background: ${props => `url(/${props.options[props.select]})`};
    background-size: cover;
    border: none;
`