import React from 'react';
import InputField from "../../../views/design/customized-layouts/InputField";
import Green from "../../../views/design/font-families/Green";
import styled from "styled-components";
import Button from "../../../views/design/Button";
import Red from "../../../views/design/font-families/Red";
import {api, handleError} from "../../../helpers/api";


const InputGuess = styled(InputField)`
  &::placeholder {
  font-family: fantasy;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    letter-spacing: 0.41em;
    text-transform: uppercase;
    font-feature-settings: 'cpsp' on, 'ss04' on;
    color: #00A6EC;
    mix-blend-mode: darken;
    text-stroke: 1px #006AAE;
    -webkit-text-stroke: 1px #006AAE;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
    text-align:center;
    font-family: fantasy;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    letter-spacing: 0.41em;
    text-transform: uppercase;
    font-feature-settings: 'cpsp' on, 'ss04' on;
    color: #00A6EC;
    text-stroke: 1px #006AAE;
    -webkit-text-stroke: 1px #006AAE;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;


// The input field to submit the guess.
export class GuessInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            placeholder: 'Enter your guess here...',
            guess: ''
        }
    }

    handleInputChange(key, value) {
        this.setState({[key]: value});
    }


    async handleGuess(guess) {
        let response = null;

        const requestBody = JSON.stringify({
            guess: guess,
            wordIndex: this.gameModel.wordIndex
        });

        try {
            let requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
            response = await api.put(`/game/${localStorage.getItem('gameId')}/guess`, requestBody, {headers: {'X-Auth-Token': requestHeader}});
        }
        catch (error) {
            console.log(`An error occurred when submitting the guess: \n${handleError(error)}`);
            return;
        }

        if (response.data && response.data.guessCorrect) {
            this.props.setGameState({guessCorrect: response.data.guessCorrect});
            // TODO: Notify other players as well.
            this.props.setFrontendGameStatus("TURN_FINISHED");
        }
    }


    render() {
        let guess = this.state.guess;

        return (
            <div>
                <InputGuess
                    value={this.state.guess}
                    placeholder={this.state.placeholder}
                    onFocus={() => {this.handleInputChange('placeholder', '')}}
                    onChange={e => {this.handleInputChange('guess', e.target.value);}}
                />
                <div className="pull-right" style={{width: "100%"}}>
                    <Button
                        style={{width: "30%", marginLeft: "auto", marginRight: "10px"}}
                        onClick={async () => {await this.handleGuess("SKIP");}}
                    >
                        <Red>Skip</Red>
                    </Button>
                    <Button
                        disabled={!this.state.guess} style={{width: "30%", marginRight: "auto"}}
                        onClick={async () => {await this.handleGuess(guess);}}
                    >
                        <Green>Submit</Green>
                    </Button>
                </div>
            </div>
        );
    }
}