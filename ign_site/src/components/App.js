import React, { Fragment } from "react";

import GlobalStyles from './styles/GlobalStyles';
import Navigation from "./Navigation";

export default class App extends React.Component {

    render() {
        return(
            <Fragment>
                <GlobalStyles/>
                <Navigation/>
            </Fragment>
        );
    }
}