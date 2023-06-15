const modal = document.getElementById("modal");
let selectedName;
let selectedClass;
let selectedRace;
let selectedAlignment;
let abilityCounter = 0;
let profCount = 0;
let abilityBonusOptions = 0;
let raceProf = false;
let classProfOne = true;
let classProfTwo = false;
let profBonus = 2;
let profSet;
let finalStats = {
  str: 0,
  dex: 0,
  con: 0,
  int: 0,
  wis: 0,
  cha: 0,
};
let racialBonus = {
  str: 0,
  dex: 0,
  con: 0,
  int: 0,
  wis: 0,
  cha: 0,
};
let adjectives = [
  "best",
  "second best",
  "third best",
  "fourth best",
  "next to worst",
  "worst",
];
let statImportedOrder = ["cha", "con", "dex", "int", "str", "wis"];

function selectName() {
  selectedName = document.getElementById("name-input").value;
  if (!selectedName) {
    return;
  }
  displayInput(selectedName, "current-name", "name");
  document.getElementById("name-next").disabled = false;
  nextPage("name-section", "class-section");
}
//*****Classes*****
makeClasses = () => {
  const classContainer = document.getElementById("class-container");
  classContainer.innerHTML = "";
  for (let i = 0; i < classData.length; i++) {
    const classDiv = `<div id="class-${i}" class="class-div ${classData[i].index}">${classData[i].name}</div>`;
    classContainer.innerHTML += classDiv;
  }
};

addClassesToPage = () => {
  setTimeout(() => {
    if (classData.length > 0) {
      makeClasses();
      addListerToClasses();
    } else {
      addClassesToPage();
    }
  }, 1000);
};

addListerToClasses = () => {
  const classList = document.getElementsByClassName("class-div");
  for (let i = 0; i < classList.length; i++) {
    classList[i].addEventListener("click", () => {
      const classInfo = classData[parseInt(classList[i].id.slice(6))];
      modal.innerHTML = `
        <h3 class="${classInfo.index}">${classInfo.name}</h3>
        <h4>Hit die:</h4>
        <p>d${classInfo.hit_die}</p>
        <h4>Proficiencies:</h4>
        <p>
        ${classInfo.proficiencies
          .slice(0, classInfo.proficiencies.length - 2)
          .map((prof) => {
            return ` ${prof.name}`;
          })}
        </p>
        <h4>Saving throws:</h4>
        <p>${classInfo.saving_throws[0].name}, ${
        classInfo.saving_throws[1].name
      }</p>
      <h4>Skills:</h4>
      <p>Choose any ${
        classInfo.proficiency_choices[0].choose
      } of the following:</p>
      <p>
      ${classInfo.proficiency_choices[0].from.options.map(
        (skill) => `${skill.item.name.slice(6)}`
      )}
      </p>
      <div class="btn-container">
        <button onclick="closeModal()">Keep looking</button>
        <button onclick="selectClass(${i})">Make a ${classInfo.name}</button>
      </div>
        `;
      openModal();
    });
  }
};

function selectClass(index) {
  selectedClass = index;
  displayInput(classData[selectedClass].name, "current-class", "class");
  document.getElementById("class-next").disabled = false;
  nextPage("class-section", "race-section");
  closeModal();
}

addClassesToPage();

//*****Races*****
makeRaces = () => {
  const raceContainer = document.getElementById("race-container");
  raceContainer.innerHTML = "";
  for (let i = 0; i < raceData.length; i++) {
    raceContainer.innerHTML += `<div id="race-${i}" class="race-div ${raceData[i].index}">${raceData[i].name}</div>`;
  }
};

addRacesToPage = () => {
  setTimeout(() => {
    if (raceData.length > 0) {
      makeRaces();
      addListerToRaces();
    } else {
      addRacesToPage();
    }
  }, 1000);
};

addListerToRaces = () => {
  const raceList = document.getElementsByClassName("race-div");
  for (let i = 0; i < raceList.length; i++) {
    raceList[i].addEventListener("click", () => {
      const raceInfo = raceData[parseInt(raceList[i].id.slice(5))];
      modal.innerHTML = `
        <h3 class="${raceInfo.index}">${raceInfo.name}</h3>
        <h4>Size:</h4>
        <p>${raceInfo.size}</p>
        <h4>Speed:</h4>
        <p>${raceInfo.speed}</p>
        <h4>Ability bonuses:</h4>
        <p>
        ${raceInfo.ability_bonuses
          .map((bonus) => `${bonus.ability_score.name}: +${bonus.bonus}`)
          .join(", ")}
        </p>
        <p>${
          raceInfo.ability_bonus_options
            ? `And choose ${
                raceInfo.ability_bonus_options.choose
              } from the following: <p>${raceInfo.ability_bonus_options.from.options
                .map((bonus) => `${bonus.ability_score.name}: +${bonus.bonus}`)
                .join(", ")}</p>`
            : ""
        }</p>
        <h4>Traits:</h4>
        <p>${
          raceInfo.traits.length !== 0 ? " " : "No racial traits available."
        }</p>
        ${raceInfo.traits.map((trait) => `<p>${trait.name}</p>`).join("")}
        <h4>Age:</h4>
        <p>${raceInfo.age}</p>
        <h4>Alignment:</h4>
        <p>${raceInfo.alignment}</p>
        <div class="btn-container">
          <button onclick="closeModal()">Keep looking</button>
          <button onclick="selectRace(${i})">Make a ${raceInfo.name}</button>
        </div>
      `;
      openModal();
    });
  }
};

function selectRace(index) {
  selectedRace = index;
  displayInput(raceData[selectedRace].name, "current-race", "race");
  document.getElementById("race-next").disabled = false;
  nextPage("race-section", "alignment-section");
  closeModal();
}

addRacesToPage();

//*****Alignments*****
makeAlignments = () => {
  for (let i = 0; i < alignmentData.length; i++) {
    document.getElementById(
      `alignment-${i}`
    ).innerHTML += `<p>${alignmentData[i].name}</p>`;
  }
};

addAlignmentsToPage = () => {
  setTimeout(() => {
    if (alignmentData.length > 0) {
      makeAlignments();
      addListerToAlignments();
    } else {
      addAlignmentsToPage();
    }
  }, 1000);
};

addListerToAlignments = () => {
  const alignmentList = document.getElementsByClassName("alignment-div");
  for (let i = 0; i < alignmentList.length; i++) {
    alignmentList[i].addEventListener("click", () => {
      const alignmentInfo =
        alignmentData[parseInt(alignmentList[i].id.slice(10))];
      modal.innerHTML = `
        <h3>${alignmentInfo.name} (${alignmentInfo.abbreviation})</h3>
        <p>${alignmentInfo.desc}</p>
        <div class="btn-container">
          <button onclick="closeModal()">Keep looking</button>
          <button onclick="selectAlignment(${parseInt(
            alignmentList[i].id.slice(10)
          )})">Become ${alignmentInfo.name}</button>
        </div>
      `;
      openModal();
    });
  }
};

function selectAlignment(index) {
  selectedAlignment = index;
  displayInput(
    alignmentData[selectedAlignment].name,
    "current-alignment",
    "alignment"
  );
  document.getElementById("alignment-next").disabled = false;
  nextPage("alignment-section", "rolling-stats-section");
  closeModal();
}

addAlignmentsToPage();

function viewCurrentChoices() {
  openModal();
  modal.innerHTML = `
  <h3>Current choices</h3>
  <h4>Name:</h4>
  <p>${selectedName}</p>
  <h4>Class:</h4>
  <p>${classData[selectedClass].name}</p>
  <h4>Race:</h4>
  <p>${raceData[selectedRace].name}</p>
  <h4>Alignment:</h4>
  <p>${alignmentData[selectedAlignment].name}</p>
  <div class="btn-container">
    <button onclick="restart()">Restart</button>
    <button onclick="closeModal()">Continue</button>
  </div>
  `;
}

function restart() {
  nextPage("rolling-stats-section", "welcome-section");
  closeModal();
}

//*****Rolling stats*****
let statRolls = [];

function takeStandardArray() {
  statRolls = [15, 14, 13, 12, 10, 8];
  nextPage("rolling-stats-section", "picking-stats-section");
  addRacialBonuses();
  displayStatRolls();
}

function rollForStats() {
  let rolls = [];
  for (let i = 0; i < 6; i++) {
    let lowest = 6;
    let currentRoll = [];
    let sum = 0;
    for (let j = 0; j < 4; j++) {
      let currentDie = Math.floor(Math.random() * 6) + 1;
      if (currentDie < lowest) {
        lowest = currentDie;
      }
      sum += currentDie;
      currentRoll.push(currentDie);
    }
    currentRoll.sort((a, b) => b - a);
    sum -= lowest;
    rolls.push([sum, currentRoll]);
  }
  rolls.sort((a, b) => b[0] - a[0]);
  for (let i = 0; i < 6; i++) {
    statRolls.push(rolls[i][0]);
  }
  displayRolls(rolls);
}

function displayRolls(rolls) {
  openModal();
  modal.innerHTML = `
  <h3>Your Rolls</h3>
  <div class="roll-container">
    <div class="die-roll">${rolls[0][1][0]}</div>
    <div class="die-roll">${rolls[0][1][1]}</div>
    <div class="die-roll">${rolls[0][1][2]}</div>
    <div class="die-roll low-roll">${rolls[0][1][3]}</div>
    <div class="total-roll">${rolls[0][0]}</div>
  </div>
  <div class="roll-container">
    <div class="die-roll">${rolls[1][1][0]}</div>
    <div class="die-roll">${rolls[1][1][1]}</div>
    <div class="die-roll">${rolls[1][1][2]}</div>
    <div class="die-roll low-roll">${rolls[1][1][3]}</div>
    <div class="total-roll">${rolls[1][0]}</div>
  </div>
  <div class="roll-container">
    <div class="die-roll">${rolls[2][1][0]}</div>
    <div class="die-roll">${rolls[2][1][1]}</div>
    <div class="die-roll">${rolls[2][1][2]}</div>
    <div class="die-roll low-roll">${rolls[2][1][3]}</div>
    <div class="total-roll">${rolls[2][0]}</div>
  </div>
  <div class="roll-container">
    <div class="die-roll">${rolls[3][1][0]}</div>
    <div class="die-roll">${rolls[3][1][1]}</div>
    <div class="die-roll">${rolls[3][1][2]}</div>
    <div class="die-roll low-roll">${rolls[3][1][3]}</div>
    <div class="total-roll">${rolls[3][0]}</div>
  </div>
  <div class="roll-container">
    <div class="die-roll">${rolls[4][1][0]}</div>
    <div class="die-roll">${rolls[4][1][1]}</div>
    <div class="die-roll">${rolls[4][1][2]}</div>
    <div class="die-roll low-roll">${rolls[4][1][3]}</div>
    <div class="total-roll">${rolls[4][0]}</div>
  </div>
  <div class="roll-container">
    <div class="die-roll">${rolls[5][1][0]}</div>
    <div class="die-roll">${rolls[5][1][1]}</div>
    <div class="die-roll">${rolls[5][1][2]}</div>
    <div class="die-roll low-roll">${rolls[5][1][3]}</div>
    <div class="total-roll">${rolls[5][0]}</div>
  </div>
  <div class="btn-container">
    <button onclick="onward()">Next</button>
  </div>
  `;
}

function onward() {
  nextPage("rolling-stats-section", "picking-stats-section");
  displayStatRolls();
  addRacialBonuses();
  addStaticProficiencies();
  checkExtraProficiencies();
  closeModal();
}

function addRacialBonuses() {
  for (let i = 0; i < raceData[selectedRace].ability_bonuses.length; i++) {
    racialBonus[raceData[selectedRace].ability_bonuses[i].ability_score.index] =
      raceData[selectedRace].ability_bonuses[i].bonus;
  }
  if (raceData[selectedRace].ability_bonus_options) {
    abilityBonusOptions = raceData[selectedRace].ability_bonus_options.choose;
    enableRacialBonusButtons();
  }
}

//*****Ability scores and picking stats*****

makeAbilityScores = () => {
  for (let i = 0; i < abilityScoreData.length; i++) {
    document.getElementById(`ability-${i}`).innerHTML += `
    <p>${abilityScoreData[i].name}</p>
    `;
    document.getElementById(`racial-bonus-${i}`).innerHTML += `
    <p>${abilityScoreData[i].name}</p>
    `;
  }
};

addAbilityScoresToPage = () => {
  setTimeout(() => {
    if (abilityScoreData.length > 0) {
      makeAbilityScores();
      addListerToAbilityScores();
      addListerToRacialBonuses();
    } else {
      addAbilityScoresToPage();
    }
  }, 1000);
};

addListerToAbilityScores = () => {
  const abilityScoreList = document.getElementsByClassName("ability-btn");
  for (let i = 0; i < abilityScoreList.length; i++) {
    abilityScoreList[i].addEventListener("click", () => {
      const abilityScoreInfo =
        abilityScoreData[parseInt(abilityScoreList[i].id.slice(8))];
      modal.innerHTML = `
        <h3 class="ability-h3">${abilityScoreInfo.full_name}</h3>
        <p>${abilityScoreInfo.name}</p>
        <p>${abilityScoreInfo.desc[0]}</p>
        <p>${abilityScoreInfo.desc[1]}</p>
        <p>Do you want to set ${abilityScoreInfo.name} to your ${
        adjectives[abilityCounter]
      } roll of ${
        statRolls[abilityCounter]
      }?  Or would you like to choose another stat?</p>
        <div class="btn-container">
          <button onclick="closeModal()">Choose another stat</button>
          <button onclick="setStat(${parseInt(
            abilityScoreList[i].id.slice(8)
          )})">Set ${abilityScoreInfo.name} to ${
        statRolls[abilityCounter]
      }</button>
        </div>
      `;
      openModal();
    });
  }
};

//******************************************************************************* */
addListerToRacialBonuses = () => {
  const abilityScoreList = document.getElementsByClassName("racial-bonus-btn");
  for (let i = 0; i < abilityScoreList.length; i++) {
    abilityScoreList[i].addEventListener("click", () => {
      const abilityScoreInfo =
        abilityScoreData[parseInt(abilityScoreList[i].id.slice(13))];
      modal.innerHTML = `
        <h3 class="ability-h3">${abilityScoreInfo.full_name}</h3>
        <p>${abilityScoreInfo.name}</p>
        <p>${abilityScoreInfo.desc[0]}</p>
        <p>${abilityScoreInfo.desc[1]}</p>
        <p>Do you want to add +1 to ${
          abilityScoreInfo.name
        }?  Or would you like to choose another stat?</p>
        <div class="btn-container">
          <button onclick="closeModal()">Choose another stat</button>
          <button onclick="setRacialBonusStat(${parseInt(
            abilityScoreList[i].id.slice(13)
          )})">Set +1 to ${abilityScoreInfo.name}</button>
        </div>
      `;
      openModal();
    });
  }
};

function setRacialBonusStat(numIndex) {
  document.getElementById(`racial-bonus-${numIndex}`).disabled = true;
  racialBonus[abilityScoreData[numIndex].index] += 1;
  abilityBonusOptions--;
  closeModal();
  if (abilityBonusOptions === 0) {
    displayPickedStats();
  }
}

function enableRacialBonusButtons() {
  for (
    let i = 0;
    i < raceData[selectedRace].ability_bonus_options.from.options.length;
    i++
  ) {
    document.getElementById(
      `racial-bonus-${statImportedOrder.indexOf(
        raceData[selectedRace].ability_bonus_options.from.options[i]
          .ability_score.index
      )}`
    ).disabled = false;
  }
}

function addStaticProficiencies() {
  for (
    let i = 0;
    i < raceData[selectedRace].starting_proficiencies.length;
    i++
  ) {
    proficiencyData[
      raceData[selectedRace].starting_proficiencies[i].index
    ].proficiencyBonus = true;
  }
  for (let i = 0; i < classData[selectedClass].proficiencies.length; i++) {
    proficiencyData[
      classData[selectedClass].proficiencies[i].index
    ].proficiencyBonus = true;
  }
}

function checkProficiencies(where) {
  let profOptions = [];
  for (i = 0; i < where.from.options.length; i++) {
    if (
      proficiencyData[where.from.options[i].item.index].proficiencyBonus ===
      false
    ) {
      profOptions.push(where.from.options[i].item.index);
    }
  }
  return profOptions;
}

function checkExtraProficiencies() {
  if (raceData[selectedRace].starting_proficiency_options) {
    raceProf = true;
  }
  if (classData[selectedClass].proficiency_choices[1]) {
    classProfTwo = true;
  }
}

function goToProficiencies() {
  closeModal();
  nextPage("picking-stats-section", "proficiency-section");
  nextPage("racial-bonus-section", "proficiency-section");
  if (raceProf) {
    profSet = "race";
    makeProficiencySection(
      raceData[selectedRace].starting_proficiency_options,
      raceData[selectedRace].name
    );
  } else if (classProfOne) {
    profSet = "class1";
    makeProficiencySection(
      classData[selectedClass].proficiency_choices[0],
      classData[selectedClass].name
    );
  } else if (classProfTwo) {
    profSet = "class2";
    makeProficiencySection(
      classData[selectedClass].proficiency_choices[1],
      classData[selectedClass].name
    );
  } else {
    nextPage("proficiency-section", "display-section");
  }
}

let proficiencyContainer = document.getElementById("proficiency-container");
let proficiencyInfoDisplay = document.getElementById("proficiency-info");

function makeProficiencySection(where, what) {
  let options = checkProficiencies(where);
  profCount = where.choose;
  proficiencyContainer.innerHTML = "";
  proficiencyInfoDisplay.innerHTML = `
  Because you are a ${what}, you get to choose ${profCount} from the following:
  `;
  for (let i = 0; i < options.length; i++) {
    proficiencyContainer.innerHTML += `
    <button id="${options[i]}" class="proficiency-btn">${
      proficiencyData[options[i]].name
    }</button>
    `;
  }
  addListerToProficiencies();
}

function addListerToProficiencies() {
  const proficiencyList = document.getElementsByClassName("proficiency-btn");
  for (let i = 0; i < proficiencyList.length; i++) {
    proficiencyList[i].addEventListener("click", () => {
      modal.innerHTML = `
        <h3>${proficiencyData[proficiencyList[i].id].name}</h3>
        <p>Do you want to choose ${
          proficiencyData[proficiencyList[i].id].name
        } as a proficiency?</p>
        <div class="btn-container">
          <button onclick="closeModal()">No</button>
          <button onclick="setProficiency('${
            proficiencyList[i].id
          }')">Yes</button>
        </div>
      `;
      openModal();
    });
  }
}

function setProficiency(index) {
  proficiencyData[index].proficiencyBonus = true;
  document.getElementById(index).disabled = true;
  closeModal();
  profCount--;
  if (profCount === 0) {
    if (profSet === "race") {
      raceProf = false;
    } else if (profSet === "class1") {
      classProfOne = false;
    } else {
      classProfTwo = false;
    }
    goToProficiencies();
  }
}

//********************************************************************************* */
function setStat(numIndex) {
  document.getElementById(`ability-${numIndex}`).disabled = true;
  finalStats[abilityScoreData[numIndex].index] += statRolls[abilityCounter];
  abilityCounter++;
  closeModal();
  if (abilityCounter > 5) {
    if (abilityBonusOptions > 0) {
      nextPage("picking-stats-section", "racial-bonus-section");
    } else {
      displayPickedStats();
    }
  }
}

addAbilityScoresToPage();

function displayStatRolls() {
  document.getElementById("current-stats").innerHTML = `
  Your current rolls are ${statRolls.join(", ")}.
  `;
}

function displayPickedStats() {
  openModal();
  modal.innerHTML = `
  <h3>Final Stats</h3>
  <table>
  <tr>
    <th class="top-left">Ability</th>
    <th>Rolls</th>
    <th>Racial Bonus</th>
    <th>Totals</th>
    <th class="top-right">Modifiers</th>
  </tr>
  <tr class="even">
    <td class="class-head">STR</td>
    <td>${finalStats.str}</td>
    <td>+${racialBonus.str}</td>
    <td>${finalStats.str + racialBonus.str}</td>
    <td>${Math.floor((finalStats.str + racialBonus.str - 10) / 2)}</td>
  </tr>
  <tr>
    <td class="class-head">DEX</td>
    <td>${finalStats.dex}</td>
    <td>+${racialBonus.dex}</td>
    <td>${finalStats.dex + racialBonus.dex}</td>
    <td>${Math.floor((finalStats.dex + racialBonus.dex - 10) / 2)}</td>
  </tr>
  <tr class="even">
    <td class="class-head">CON</td>
    <td>${finalStats.con}</td>
    <td>+${racialBonus.con}</td>
    <td>${finalStats.con + racialBonus.con}</td>
    <td>${Math.floor((finalStats.con + racialBonus.con - 10) / 2)}</td>
  </tr>
  <tr>
    <td class="class-head">INT</td>
    <td>${finalStats.int}</td>
    <td>+${racialBonus.int}</td>
    <td>${finalStats.int + racialBonus.int}</td>
    <td>${Math.floor((finalStats.int + racialBonus.int - 10) / 2)}</td>
  </tr>
  <tr class="even">
    <td class="class-head">WIS</td>
    <td>${finalStats.wis}</td>
    <td>+${racialBonus.wis}</td>
    <td>${finalStats.wis + racialBonus.wis}</td>
    <td>${Math.floor((finalStats.wis + racialBonus.wis - 10) / 2)}</td>
  </tr>
  <tr>
    <td class="class-head bottom-left">CHA</td>
    <td>${finalStats.cha}</td>
    <td>+${racialBonus.cha}</td>
    <td>${finalStats.cha + racialBonus.cha}</td>
    <td class="bottom-right">${Math.floor(
      (finalStats.cha + racialBonus.cha - 10) / 2
    )}</td>
  </tr>
</table>
<div class="btn-container">
  <button onclick="goToProficiencies()">Continue</button>
</div>
  `;
}
