import styled, { css } from "styled-components";

import IGN_Logo from '../../assets/icons/ign_logo';

export const Nav_Container = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px #cdcdcd;

    & > div {
        display: flex;
        flex-direction: row;
        padding: 0 120px;
    }

    & > div:nth-child(1) {
        padding-top: 20px;
        padding-bottom: 20px;
        justify-content: space-between;
        background-color: ${props => props.theme.secondary};
    }

    & > div:nth-child(2) {
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-evenly;
        height: 45px;
        overflow: hidden;
        user-select: none;
        background-color: ${props => props.theme.tertiary};
    }

    & > div:nth-child(2) a {
        text-decoration: none;
        font-family: Lato;
        font-weight: 700;
        font-size: 15px;
        color: #404041;
        line-height: 25px;
        padding: 0 28px;
        margin: 12px 0;
        border-left: 1px solid ${props => props.theme.primary};
    }
    & > div:nth-child(2) a:first-child {
        border-left: none;
    }
`;

export const StyledLogo = styled(IGN_Logo)`
    width: 160px;
    height: auto;
`;

export const Date_Logo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    user-select: none;
    height: 50px;

    h1 {
        height: inherit;
        display: flex;
        flex-direction : column;
        font-size: 22px;
        line-height: 22px;
        justify-content: space-evenly;
        margin-left: 15px;
        white-space: nowrap;
    }
`;

export const ContentSelection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 40px;
    max-width: 700px;
    height: 50px;
    user-select: none;
`;

export const SelectionList = styled(ContentSelection)`
    height: inherit;
    flex: 1 1 0 !important;
    justify-content: space-evenly !important;
    margin: 0;
    overflow: hidden;

    a {
        text-decoration: none;
        color: black;
        font-size: 20px;
        margin: 10px;
    }
`;

export const SelectionList_More = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: inherit;
    flex: 0 0 90px;
    justify-content: space-evenly;
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    padding: 0 5px;

    h1 {
        font-weight: 400;
        font-size: 20px;
    }
    svg {
        width: 10px;
        margin-left: 5px;
    }
    &:hover svg {
        transform: rotate(180deg);
        transition: transform 0.15s linear;
    }
    div {
        position: absolute;
        left: 0;
        top: 100%;
        display: flex;
        flex-direction: column;
        background-color: ${props => props.theme.primary};
    }
    div > a {
        text-decoration: none;
        color: black;
        font-size: 18px;
        padding: 5px 10px;
    }
    div > a:hover {
        background-color: ${props => props.theme.quaternary};
    }
    div > a:focus {
        outline: none;
    }

    &:hover {
        overflow: visible;
        background-color: ${props => props.theme.primary};
    }
`;

export const SearchBox = styled.form`
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
        /* border-radius: ${props => props.numAutoComplete ? '8px 8px 0 0' : '20px'}; */
        border-radius: ${props => props.searchInputFocused ? '8px 8px 0 0' : '20px'};
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
        background-color: #fff;
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
        background-color: black;

        img { 
            width: auto;
            height: inherit;
            object-fit: cover;
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

export const ThemeSelection = styled.button`
    flex: 0 0 65px;
    height: 32px;
    border-radius: 20px;
    border: 2px solid black;
    display: flex;
    background: transparent;
    align-items: center;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    margin: 0 10px;

    &:focus-visible {
        outline: auto;
    }

    div {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background-color: ${props => props.theme.quaternary};
        display: flex;
        align-items: 'center';
        justify-content: center;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        transition: left 0.10s linear;

        ${props => props.activeTheme == 'dark' && css`
            left: 33px;
        `}
    }

    div > svg {
        width: 17px;
        fill: ${props => props.theme.secondary};
    }
`;

export const Profile = styled.a.attrs({
    href: 'https://www.ign.com/register',
    target: '_blank',
    title: 'Register'   
})`
    flex: 0 0 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    -webkit-user-drag: none;
    
    img {
        width: 90%;
        border-radius: 50%;
        -webkit-user-drag: none;
    }

    h1 {
        width: 20px !important;
        height: 20px !important;
        position: absolute;
        left:-3px;
        top: -3px;
        font-size: 11px;
        font-weight: 700;
        background-color: #bf1313;
        border-radius: 50%;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;