import styled, { css } from "styled-components";

import IGN_Logo from '../../assets/icons/ign_logo';

export const Nav_SubContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Nav_Container = styled(Nav_SubContainer)`
    flex-direction: column;
    box-shadow: 0 1px #cdcdcd;
    padding: 0;

    ${Nav_SubContainer} {
        padding-left: 120px;
        padding-right: 120px;
    }

    ${Nav_SubContainer}:nth-child(1) {
        padding-top: 20px;
        padding-bottom: 20px;
        justify-content: space-between;
        background-color: ${props => props.theme.secondary};
    }
    ${Nav_SubContainer}:nth-child(2) {
        padding-top: 20px;
        padding-bottom: 20px;
        background-color: ${props => props.theme.tertiary};
    }
`;

export const StyledLogo = styled(IGN_Logo)`
    width: 160px;
    height: auto;
`;

export const Date_Logo = styled(Nav_SubContainer)`
    padding: 0 !important;
    height: 50px;
    align-items: center;
    user-select: none;

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

export const ContentSelection = styled(Nav_SubContainer)`
    height: 50px;
    width: 600px;
    padding: 0 !important;
    align-items: center;
    background: transparent !important;
    margin-left: 40px;

`;

export const SelectionList = styled(ContentSelection)`
    height: inherit;
    flex: 1 1 0 !important;
    justify-content: space-evenly;
    overflow: hidden;
    margin: 0;

    a {
        text-decoration: none;
        color: black;
        margin: 0 10px;
        font-size: 20px;
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

    &:hover {
        overflow: visible;
        background-color: ${props => props.theme.primary};
    }
`;

export const SearchBox = styled.form`
    height: 30px;
    width: ${props => props.open? '100%' : '30px'};
    overflow: hidden;
    border-radius: 20px;
    margin: 0 10px;
    display: flex;
    transition: width 0.4s linear, background-color 0.4s linear;
    background-color: ${props => props.open ? props.theme.tertiary : 'transparent'};

    button {
        flex: 0 0 30px;
        height: 30px;
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background: transparent;
    }
    button:hover {
        background-color: ${props => props.theme.quaternary};
    }
    button > svg {
        width: 20px;
    }

    input {
        flex: 1;
        border: none;
        font-size: 16px;
        padding: 0 5px;
        background: transparent;
    }

`;

export const Profile = styled.a.attrs({
    href: 'https://www.ign.com/register',
    title: 'Register'   
})`
    flex: 0 0 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    
    img {
        width: 90%;
        border-radius: 50%;
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