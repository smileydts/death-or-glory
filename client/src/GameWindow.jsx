import React from 'react';
import './GameWindow.css';
import Cards from './Cards';
import DieRoll from './DieRoll';
import PlayerStats from './PlayerStats';
import TurnTracker from './TurnTracker';
import TextWindow from './TextWindow';
import Timer from './Timer';


function GameWindow () {
    return (
        <>
        <div className="gamepage">
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
                <div className="timer">
                    <Timer />
                    </div>
        </div>
        </>
    );
}
export default GameWindow;