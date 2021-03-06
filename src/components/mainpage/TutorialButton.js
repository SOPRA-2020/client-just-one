import styled from "styled-components";
import {Button} from "../../views/design/Button";
import Pink from "../../views/design/font-families/Pink";
import React from "react";

const FlexButton = styled(Button)`
  display: flex;
  justify-content: center;
  margin: 10px;
  background: #FFFFFF;
`;


// one of the buttons in the middle part of main page
class TutorialButton extends React.Component {
    render() {
        return (
            <FlexButton
                onClick={() => {
                    // redirect to tutorial
                    this.props.history.push("/tutorial");
                }}>
                <Pink>Tutorial</Pink>
            </FlexButton>
        );
    }
}

export default TutorialButton;