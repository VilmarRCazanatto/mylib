import styled from 'styled-components'

const gridPosition = ({ x, y, width, height }) => () => `
    grid-column-start: ${x + 1};
    grid-row-start: ${y + 1};
    grid-column-end: ${x + 1 + width};
    grid-row-end: ${y + 1 + height};
`

export const ReadingCardContainer = styled.div`
    position: relative;
    width: 100%;
    height: 200px;
    margin-top: ${props => props.hide ? "-210px" : "30px"};

    z-index: 0;

    h3 {
        position: absolute;
        padding-left: 5px;
        font-size: 22px;
        top: -34px;
    }

    #card {
        width: 100%;
        height: 100%;
        border-radius: 15px;
        background: var(--white-color);
        box-shadow: 0 0 8px rgba(0,0,0,.4);
        overflow: hidden;
        padding-right: 10px;

        display: grid;
        grid-template-columns: 140px 1fr 50px;
        grid-template-rows: 26px 20px 130px 24px;
        column-gap: 10px;

        * {
            overflow: hidden;
        }

        #cover {
            ${gridPosition({ x: 0, y: 0, width: 1, height: 4 })}
        }
        #title {
            ${gridPosition({ x: 1, y: 0, width: 2, height: 1 })}

            font-size: 18px;
            line-height: 26px;
        }
        #author {
            ${gridPosition({ x: 1, y: 1, width: 1, height: 1 })}

            font-size: 14px;
            line-height: 20px;
        }
        #release {
            ${gridPosition({ x: 2, y: 1, width: 1, height: 1 })}

            font-size: 14px;
            line-height: 20px;
        }
        #sinopse {
            ${gridPosition({ x: 1, y: 2, width: 2, height: 1 })}
            
            font-size: 13px;
            line-height: 13px;
        }
        #rate {
            ${gridPosition({ x: 1, y: 3, width: 2, height: 1 })}            
        }
    }
`
export const Cover = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background: ${props => `url("https://m.media-amazon.com/images/I/${props.bgId}.jpg")`};
    background-size: cover;
    background-position: 50%;

    box-shadow: 0 0 5px rgba(0,0,0,.5);
`