import styled, { css } from "styled-components";
import { breakPoints, deviceSizes } from './breakPoints';
import { StyledSearchBar } from "./SearchBar.styled";

import { IGN_Logo_White, IGN_Logo_Color } from '../../assets/icons/ign_logo';

// export const Nav_Container = styled.div`
//     display: flex;
//     flex-direction: column;
//     box-shadow: 0 1px #cdcdcd;

//     & > div {
//         display: flex;
//         flex-direction: row;
//         padding: 0 120px;
//     }

//     & > div:nth-child(1) {
//         padding-top: 20px;
//         padding-bottom: 20px;
//         justify-content: space-between;
//         background-color: ${props => props.theme.secondary};
//     }

//     & > div:nth-child(2) {
//         align-items: center;
//         flex-wrap: wrap;
//         justify-content: space-evenly;
//         height: 45px;
//         overflow: hidden;
//         user-select: none;
//         background-color: ${props => props.theme.tertiary};
//     }

//     & > div:nth-child(2) a {
//         text-decoration: none;
//         font-family: Lato;
//         font-weight: 700;
//         font-size: 15px;
//         color: #404041;
//         line-height: 25px;
//         padding: 0 28px;
//         margin: 12px 0;
//         border-left: 1px solid ${props => props.theme.primary};
//     }
//     & > div:nth-child(2) a:first-child {
//         border-left: none;
//     }
// `;

export const Nav_Container = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px #cdcdcd;

    .navMain {
        display: flex;
        flex-direction: column;
    }

    .navSub {
        display: flex;
        flex-direction: row;
        background-color: ${props => props.theme.tertiary};
        height: 40px;
        align-items: center;
        overflow-x: scroll;
        overflow-y: hidden;

        a {
            text-decoration: none;
            font-family: Lato;
            font-weight: 700;
            font-size: 15px;
            color: #404041;
            line-height: 25px;
            padding: 0 28px;
            white-space: nowrap;
            /* margin: 12px 0; */
            border-left: 1px solid ${props => props.theme.primary};
        }
        a:first-child {
            border-left: none;
        }
    }
    .navSub::-webkit-scrollbar {
        display: none;
    }

    @media ${breakPoints.laptop} {
        & > div {
            padding: 0 80px;
        }
        
        .navMain {
            flex-direction: row;
            padding-top: 20px;
            padding-bottom: 20px;
            justify-content: space-between;
        }
    }

    @media ${breakPoints.desktop} {
        & > div {
            padding: 0 120px;
        }
    }
`;

export const StyledLogo = styled.a.attrs((props) => ({
    href: 'https://www.ign.com/',
    target: '_blank',
    children: (() => props.theme.type === 'classic' ? <IGN_Logo_Color/> : <IGN_Logo_White/>)(),
}))`
    height: 100%;
    svg {
        height: inherit;
        width: fit-content;
    }
`;


export const Date_Logo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    user-select: none;
    justify-content: center;
    height: 45px;
    padding: 5px 0;

    h1 {
        height: inherit;
        display: none; // flex for web
        flex-direction : column;
        font-size: 22px;
        line-height: 22px;
        justify-content: space-evenly;
        margin-left: 15px;
        white-space: nowrap;
    }

    @media ${breakPoints.laptop} {
        h1 {
            display: flex;
        }
    }
`;

export const ContentSelection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1 1 0;
    height: 50px;
    user-select: none;
    padding: 8px 10px;

    ${StyledSearchBar} {
        max-width: 500px;
    }

    @media (max-width: ${deviceSizes.minLaptop - 1}px) {
        ${StyledSearchBar} {
            flex: 1 1 0;

            .searchForm {
                background-color: ${props => props.theme.tertiary};
            }

            button {
                pointer-events: none;
            }
        }
    }
    
    @media ${breakPoints.tablet} {
        ${StyledSearchBar} {
            margin-right: auto;
        }
    }
    @media ${breakPoints.laptop} {
        ${StyledSearchBar} {
            margin: unset;
        }
    }

    @media ${breakPoints.laptop} {
        margin-left: 40px;
        padding: 0;
    }
`;

export const SelectionList = styled(ContentSelection)`
    justify-content: flex-end !important;
    overflow: hidden;
    display:none;
    margin-left: auto;
    max-width: 450px;

    a {
        text-decoration: none;
        color: black;
        font-size: 20px;
        margin-left: 15px;
    }

    @media ${breakPoints.laptop} {
        display: flex;
    }
`;

export const SelectionList_More = styled.button`
    display: none;  //flex for web view
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

    @media ${breakPoints.laptop} {
        display: flex;
    }
    
`;

export const ThemeSelection = styled.button`
    flex: 0 0 65px;
    height: 32px;
    border-radius: 20px;
    border: 2px solid black;
    display: none;  // flex for web
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

    @media ${breakPoints.tablet} {
        display: flex;
    }
    @media ${breakPoints.laptop} {
        display:none;
    }
    @media ${breakPoints.desktop} {
        display: flex;
    }
`;

export const Profile = styled.a.attrs({
    href: 'https://www.ign.com/register',
    target: '_blank',
    title: 'Register'   
})`
    flex: 0 0 50px;
    height: 50px;
    display: none;  // flex for web view
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

    @media ${breakPoints.tablet} {
        display: flex;
    }
    @media ${breakPoints.laptop} {
        display: none;
    }
    @media ${breakPoints.desktop} {
        display: flex;
    }
`;