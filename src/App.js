import './App.css';
import React, {useState} from 'react';
import Optimizer from './util/Optimizer';
import SaveImport from './Components/SaveImport/SaveImport';
import DataCoreCrew from './util/DataCoreCrew';

function App() {
  const [saveData, setSaveData] = useState(Optimizer);

  function importData(saveData) {
    let crewPotential = {};
    /* This can be added for dynamic functionality later. Can hard code for now
    fetch('https://datacore.app/structured/crew.json')
      .then(response => response.json)
      .then(data => crewPotential = data);
      Optimizer.crewPotential = crewPotential;
    */
    console.log(Optimizer);
    console.log("Processing Roster");
    Optimizer.assessCrewRoster(saveData, DataCoreCrew);
    console.log("Roster Processed. Starting Voyage Rankings");
    Optimizer.sortVoyageRankings();
    console.log("Crew sorted by voyage EV. Finding best current crew.");
    Optimizer.findCurrentBestCrew();
    console.log("Best Current Crew Calculated. Calculating best potential crew at current rarity");
    Optimizer.findBestForRarity();
    console.log("Best crew for rarity calculated. Comparing differences");
    Optimizer.findCrewToTrain();
    console.log("Potential EV Improvements Found");
    Optimizer.findEVContributionOfCrewToTrain();
    Optimizer.sortCrewToTrain();
    Optimizer.findBestCitedCrew();
    Optimizer.findCrewToCite();
    Optimizer.findEVContributionOfCrewToCite();
    Optimizer.sortCrewToCite();
    console.log(Optimizer);
    console.log("Ranked Crew to Train");
    console.log(Optimizer.rankedCrewToTrain);
    console.log("Ranked Crew To Cite");
    console.log(Optimizer.rankedCrewToCite);
  }

  return (
    <div className="App">
      <h1>Voyage Improvement tool - Citation and Training Advice</h1>
      <SaveImport label={saveData} importData={importData} optimizer={Optimizer}/>
      <ol>
      <h2>Instructions</h2>
      <li>Using a proper computer (sorry, no mobile yet) open up your browsers developer tools (usually press F12)</li>
      <li>Go to the "console" tab of the developer tools.</li>
      <li>Copy and paste your save file into the box like you would on DataCore, from <a href="https://stt.disruptorbeam.com/player?client_api=17" className="link">here</a>.</li>
      <li>Scroll to the bottom of the console where you can find your ranked crew to train and cite!</li>
      </ol>
      <h2>Details</h2>
      <div>Voyages are calculated for every combination and have an Expected Value (EV) which is based on each crews base+(min + max)/2 for each skill, then for the voyage main proficiency times 0.35, secondary proficiency times 0.25 and all other times 0.1.  This is the total score for the voyage.  We use this to rank all of your crew for each proficiency combo of voyage from best to worst.  We then do this again assuming you had leveled all your crew to 100, and compare the difference in EV for each voyage to work out how much you would gain by leveling that crew.  This produces the "Ranked Crew to Train" section in the console output, you will get a list of what voyages they improve, and how much they will improve the best proficiency combo by. Then finally we do this all over again assuming that you have <b>fully</b> cited your crew, and then tell you the EV benefit per citation.  Note that for citations the assumption is that you will cite a crew to 5/5, so this tool does not answer "where should I spend the next citation for most improvement", it answers "who should I cite to 5/5 for most improvement", as one citation on a killer 1/5 may have no effect on your voyages, but at 5/5 they might be your best crew.</div>
      <h2>Known Issues</h2>
      <ul>
        <li>Error in the console about Pool has too many crew. This does not affect the results.</li>
        <li>Error in the console about not being able to find crew '' in roster.  This does not affect the results.</li>
        <li>Clicking the import button multiple times will create duplicate entries in the VoyagesImproved data.  The order and EV gains are still correct.</li>
      </ul>
      <div>---</div>
      <div>Game roster will be constantly synced after migration to <a href='https://datacore.app/' className="link">DataCore!</a></div>
      <div>---</div>
      <div>Last Game Roster Update: 10-09-2021</div>
    </div>
  );
}

export default App;
