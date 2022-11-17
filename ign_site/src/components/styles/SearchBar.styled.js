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
        border-radius: ${props => props.autoCompleteLen && props.searchInputFocused ? '8px 8px 0 0 ' : '20px'};
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

export const AutoCompleteItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    height: 48px;
    z-index: 2;
    
    &:hover {
        background-color: ${props => props.theme.primary};
    }

    div {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        margin: 0 10px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${props => props.itemProps.background_image ? '#0f0f0f' : 'transparent'};

        img { 
            width: auto;
            height: inherit;
            object-fit: cover;
        }
        svg {
            width: 15px;
        }
    }

    h1 {
        flex: 1 1 0;
        font-size: 16px;
        font-weight: 500;
        line-height: 18px;
        cursor: pointer;
    }
`;