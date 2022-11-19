import styled from "styled-components";


export const StyledSearchBar = styled.form`
    height: 30px;
    width: ${props => props.open ? '100%' : '30px'};
    margin: 0 10px;
    transition: width 0.4s linear;
    position: relative;

    .searchForm {
        flex: 1 1 0;
        height: inherit;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        border-radius: ${props => !props.emptyAutoComplete && props.searchInputFocused ? '8px 8px 0 0 ' : '20px'};
        background-color: ${props => props.open ? props.theme.tertiary : 'transparent'};
        transition: background-color 0.4s linear;

        button {
            flex: 0 0 30px;
            height: 30px;
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            cursor: pointer;

            svg {
                width: 20px;
            }
        }
        button:hover {
            background-color: ${props => props.theme.quaternary};
        }

        input {
            flex: 1;
            border: none;
            font-size: 16px;
            padding: 0 5px;
            background: transparent;
        }
    }
    .searchAutoComplete {
        display: ${props => props.searchInputFocused ? 'block' : 'none'};
        position: absolute;
        top: 100%;
        width: inherit;
        border-radius: 0 0 8px 8px;
        overflow: hidden;
        background-color: ${props => props.theme.tertiary};
    }
`;

export const StyledAutoCompleteGame = styled.div.attrs(() => ({
    tabIndex: 0,
}))`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    height: 50px;

    &:hover {
        background-color: ${props => props.theme.primary};
    }

    .AutoComplete-Img {
        flex: 0 0 40px;
        height: 40px;
        border-radius: 8px;
        margin: 0 10px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;

        img { 
            flex: 1 0 auto;
            height: inherit;
            object-fit: fill;
        }
        svg {
            width: 15px;
        }
    }
    .AutoComplete-Info {
        height: 40px;
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        padding-right: 5px;


        div {
            display: flex;
            flex-direction: row;
            align-items: center;

            svg {
                height: 16px;
                width: auto;
                fill: #fff;
                margin-right: 5px;
            }

            h1 {
                font-size: 18px;
                font-weight: 400;
                letter-spacing: -2px;
            }
        }
        h1 {
            width: inherit;
            font-size: 16px;
            font-weight: 500;
            line-height: 18px;
            cursor: pointer;
            white-space: nowrap;
            margin: auto 0;
        }
    }
`;

export const StyledAutoCompleteMovie = styled(StyledAutoCompleteGame)`
    height: 60px;

    & .AutoComplete-Img {
        height: 50px;
        border-radius: 4px;
    }
    & .AutoComplete-Info {
        flex: 1;
        height: inherit;
        padding: 5px 0;
        justify-content: space-around !important;

        h1 {
            font-size: 16px;
        }
        h2 {
            font-size: 14px;
            font-weight: 500;
        }
    }
`;

export const StyledLoadingAutoCompleteItem = styled.div.attrs(props => ({
    children: (<>
        <div/>
        <div>
            <div/>
            <div/>
        </div>
    </>)
}))`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
    background-color: #383434;

    & > div:nth-child(1) {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        margin: 0 10px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(-45deg, #9c9996, #9cabab, #919191, #747372);
        background-size: 400% 400%;
        animation: gradient 15s ease infinite;
    }

    & > div:nth-child(2) {
        flex: 1;
        height: inherit;
        display: flex;
        flex-direction: column;
        justify-content: center;
        
        div {
            border-radius: 8px;
            background: linear-gradient(-45deg, #9c9996, #9cabab, #919191, #747372);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
        }

        div:nth-child(1) {
            height: 12px;
            width: 40%;
            margin-bottom: 7px;
        }
        div:nth-child(2) {
            height: 18px;
            width: 90%;
        }
    }

    @keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
`;

// export const AutoCompleteItem = styled.div`
    // display: flex;
    // flex-direction: row;
    // align-items: center;
    // cursor: pointer;
    // height: 48px;
    // z-index: 2;
    
    // &:hover {
    //     background-color: ${props => props.theme.primary};
    // }

    // div {
    //     width: 40px;
    //     height: 40px;
    //     border-radius: 8px;
    //     margin: 0 10px;
    //     overflow: hidden;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     background-color: ${props => props.itemProps.background_image ? '#0f0f0f' : 'transparent'};

    //     img { 
    //         width: auto;
    //         height: inherit;
    //         object-fit: cover;
    //     }
    //     svg {
    //         width: 15px;
    //     }
    // }

//     h1 {
//         flex: 1 1 0;
//         font-size: 16px;
//         font-weight: 500;
//         line-height: 18px;
//         cursor: pointer;
//     }
// `;