import styled from 'styled-components'

export const ShelfScrollContainer = styled.div`
    width: 100%;
    padding: 5px 0 12px 0;

    h2 {
        font-size: 22px;
        line-height: 24px;
        color: var(--accent-color);
        margin-left: 10px;
    }

    #scroll {
        width: 100%;
        padding: 3px 10px;   
        overflow-x: scroll;
        overflow-y: hidden;

        #content {
            display: flex;

            img {
                height: 110px;
                margin-right: 5px;

                box-shadow: 0 0 3px rgba(0,0,0,.4);
            }

        }
    }

`