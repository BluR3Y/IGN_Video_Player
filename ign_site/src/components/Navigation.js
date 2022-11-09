import React from "react";

import { Nav_Container, Nav_SubContainer, Date_Logo , StyledLogo, ContentSelection } from "./styles/Navigation.styled";

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return(
            <Nav_Container>
                <Nav_SubContainer>
                    <Date_Logo>
                        <StyledLogo/>
                        <h1>
                            <span>Sunday,</span>
                            <span>October 16</span>
                        </h1>
                    </Date_Logo>
                    <ContentSelection>

                    </ContentSelection>
                </Nav_SubContainer>
                <Nav_Container>
                    {/* Additiona Content Selection */}
                </Nav_Container>
            </Nav_Container>
        );
    }
}