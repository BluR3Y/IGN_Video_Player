import React from "react";
import { ContentSelectionBtn, StyledContentSelection } from "./styles/ContentSelection.styled";

class ContentItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
}

export default class ContentSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeType: 'videos',
            contentTypes: ['latest', 'videos', 'articles'],
            extendedContentList: false
        }
    }

    setContentType = (event) => {
        this.setState({ activeType: event.currentTarget.value });
    }
    // Last Here
    render() {
        const {
            inTheaterMode
        } = this.props;
        const {
            activeType,
            contentTypes,
            extendedContentList
        } = this.state;
        const {
            setContentType
        } = this;
        return <StyledContentSelection
                inTheaterMode={inTheaterMode}
                extendedContentList={extendedContentList}
            >
            <div className="typeSelection">{contentTypes.map((item, index) => 
                <ContentSelectionBtn
                    value={item} 
                    key={index}
                    selected={item === activeType}
                    onClick={setContentType}
                >{item}</ContentSelectionBtn>)}
            </div>
            <div className="contentWrapper">

            </div>
            <button className="extendList" onClick={() => this.setState(prevState => ({ extendedContentList: !prevState.extendedContentList }))}>{extendedContentList ? 'Less' : 'More'}</button>
        </StyledContentSelection>
    }
}