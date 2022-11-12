import React, { Fragment } from "react";

import GlobalStyles from './styles/GlobalStyles';
import Navigation from "./Navigation";
import { ThemeProvider } from "styled-components";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            siteThemes: {
                classic: {
                    primary: '#bf1313',
                    secondary: '#ffffff',
                    tertiary: '#bbc4c4',
                    quaternary: '#41495a'
                },
                dark: {
                    primary: '#bf1313',
                    secondary: '#41495a',
                    tertiary: '#bbc4c4',
                    quaternary: '#ffffff'
                }
            },
            activeTheme: null
        }
    }

    render() {
        return(
            <ThemeProvider theme={this.activeTheme != null ? this.activeTheme : this.state.siteThemes.dark}>
                <GlobalStyles/>
                <Navigation/>
            </ThemeProvider>
        );
    }
}