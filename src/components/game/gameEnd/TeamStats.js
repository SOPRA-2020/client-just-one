import React from 'react';
import styled from "styled-components";
import Green from "../../../views/design/font-families/Green";
import Blue from "../../../views/design/font-families/Blue";


export class TeamStats extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {

        let cardsUsed = 13; // Number of cards which were used. Is 13, unless game ends prematurely (player left).

        // game ended because players left -> maybe not all rounds played
        if (this.props.gameModel.playerIds.length < 3) {
            cardsUsed = this.props.gameStats.wordsGuessedCorrect - 2 * this.props.gameStats.wordsGuessedWrong;
        }

        let skippedCount = cardsUsed - this.props.gameStats.wordsGuessedCorrect - 2 * this.props.gameStats.wordsGuessedWrong;
        if (cardsUsed - this.props.gameStats.wordsGuessedWrong !== (this.props.gameModel.round - 1)) {
            // last word was wrong -> -1 words left -> add 1 to skippedCount
            skippedCount = cardsUsed - this.props.gameStats.wordsGuessedCorrect - 2 * this.props.gameStats.wordsGuessedWrong + 1;
        }

        return (
            <React.Fragment>
            <StatsRow>
                <Label style={{background: '#F8E7D1'}}>
                    <Green style={{letterSpacing: '0.1em'}}>
                        Correct
                    </Green>
                </Label>
                <Label style={{background: 'white'}}>
                    <Blue style={{letterSpacing: '0.1em'}}>
                        {this.props.gameStats.wordsGuessedCorrect}
                    </Blue>
                </Label>
            </StatsRow>
            <StatsRow>
                <Label style={{background: '#F8E7D1'}}>
                    <Green style={{letterSpacing: '0.1em'}}>
                        Incorrect
                    </Green>
                </Label>
                <Label style={{background: 'white'}}>
                    <Blue style={{letterSpacing: '0.1em'}}>
                        {this.props.gameStats.wordsGuessedWrong}
                    </Blue>
                </Label>
            </StatsRow>
            <StatsRow>
                <Label style={{background: '#F8E7D1'}}>
                    <Green style={{letterSpacing: '0.1em'}}>
                        Skipped
                    </Green>
                </Label>
                <Label style={{background: 'white'}}>
                    <Blue style={{letterSpacing: '0.1em'}}>
                        {skippedCount}
                    </Blue>
                </Label>
            </StatsRow>
            </React.Fragment>
        );
    }
}


const Label = styled.div`
margin: 15px;
width: 240px;
height: 36px;
background: white;
border: 4px solid #DDC18E;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
text-align: center;
`;


const StatsRow = styled.div`
margin: 0px 200px;
display: flex;
flexDirection: row;
justify-content: space-between;
line-height: 0px;
`;


/*
// Code for all stats (including times).
<React.Fragment>
            <StatsRow>
                <Label style={{background: '#F8E7D1'}}>
                    <Green style={{letterSpacing: '0.1em'}}>
                        Correct
                    </Green>
                </Label>
                <Label style={{background: 'white'}}>
                    <Blue style={{letterSpacing: '0.1em'}}>
                        {this.props.gameStats.wordsGuessedCorrect}
                    </Blue>
                </Label>
                <Label style={{background: '#F8E7D1'}}>
                    <Green style={{letterSpacing: '0.1em'}}>
                        Time For Clues
                    </Green>
                </Label>
                <Label style={{background: 'white'}}>
                    <Blue style={{letterSpacing: '0.1em'}}>
                        x:xx
                    </Blue>
                </Label>
            </StatsRow>
            <StatsRow>
                <Label style={{background: '#F8E7D1'}}>
                    <Green style={{letterSpacing: '0.1em'}}>
                        Incorrect
                    </Green>
                </Label>
                <Label style={{background: 'white'}}>
                    <Blue style={{letterSpacing: '0.1em'}}>
                        {this.props.gameStats.wordsGuessedWrong}
                    </Blue>
                </Label>
                <Label style={{background: '#F8E7D1'}}>
                    <Green style={{letterSpacing: '0.1em'}}>
                        Time For Guesses
                    </Green>
                </Label>
                <Label style={{background: 'white'}}>
                    <Blue style={{letterSpacing: '0.1em'}}>
                        x:xx
                    </Blue>
                </Label>
            </StatsRow>
            <StatsRow>
                <Label style={{background: '#F8E7D1'}}>
                    <Green style={{letterSpacing: '0.1em'}}>
                        Skipped
                    </Green>
                </Label>
                <Label style={{background: 'white'}}>
                    <Blue style={{letterSpacing: '0.1em'}}>
                        {13 - this.props.gameStats.wordsGuessedCorrect - this.props.gameStats.wordsGuessedWrong}
                    </Blue>
                </Label>
                <Label style={{background: '#F8E7D1'}}>
                    <Green style={{letterSpacing: '0.1em'}}>
                        Total Time
                    </Green>
                </Label>
                <Label style={{background: 'white'}}>
                    <Blue style={{letterSpacing: '0.1em'}}>
                        xx
                    </Blue>
                </Label>
            </StatsRow>
            </React.Fragment>
 */