import React from "react";
import styled from "styled-components";
import {Button} from "../../../views/design/Button";
import Red from "../../../views/design/font-families/Red";
import {api} from "../../../helpers/api";
import {withRouter} from "react-router-dom";

const FlexButton = styled(Button)`
  display: flex;
  justify-content: center;
  margin: 10px;
  width: 267px;
`;


class FinishButton extends React.Component {
    constructor(props) {
        super(props);
    }
    async leaveGame() {
        try {
            let requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
            let requestBody = localStorage.getItem('userId');
            let gameId = localStorage.getItem('gameId');
            localStorage.removeItem("gameId");
            await api.delete(`game/${gameId}`, {headers:{'X-Auth-Token': requestHeader}, data:requestBody});
            clearTimeout(this.props.timerId);
        }
        catch {
            console.log("fail");
        }
    }

    render() {
        return (
            <FlexButton
                onClick={() => {
                    this.leaveGame().then(r => this.props.history.push(`/lobby/${localStorage.getItem('lobbyId')}`));
                }}
            >
                <Red>Finish</Red>
            </FlexButton>
        );
    }
}
export default withRouter (FinishButton);
