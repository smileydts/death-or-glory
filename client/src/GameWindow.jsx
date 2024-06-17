import React from 'react';
import './GameWindow.css';
import Cards from './Cards';
import DieRoll from './DieRoll';
import PlayerStats from './PlayerStats';
import TurnTracker from './TurnTracker';
import TextWindow from './TextWindow';


function GameWindow () {
    return (
        <>
        <div classname="gamepage">
             <h1>Death or Glory</h1>
                <div className="turntracker">
                    <TurnTracker />
                </div>
                <div className="playerstats">
                    <PlayerStats /> 
                </div>
                <div className="textwindow">
                    <TextWindow />
                </div>
                <div className="cards">
                    <Cards />
                </div>
                <div className="dieroll">
                    <DieRoll />
                    </div>
        </div>
        </>
    );
}
export default GameWindow;