function makeCharacterSheet() {
  makeSheetStats();
  makeSheetSavingThrows();
  document.getElementById("sheet-prof-bonus").innerHTML = profBonus;
  makeSkillSheet();
  if (proficiencyData["skill-perception"].proficiencyBonus === true) {
    document.getElementById("sheet-passive-wisdom").innerHTML =
      10 + profBonus + Math.floor((finalStats.wis + racialBonus.wis - 10) / 2);
  } else {
    document.getElementById("sheet-passive-wisdom").innerHTML =
      10 + Math.floor((finalStats.wis + racialBonus.wis - 10) / 2);
  }
  makeTraits();
}

const abilityArray = ["str", "dex", "con", "int", "wis", "cha"];
const skillList = [
  ["skill-acrobatics", "dex"],
  ["skill-animal-handling", "wis"],
  ["skill-arcana", "int"],
  ["skill-athletics", "str"],
  ["skill-deception", "cha"],
  ["skill-history", "int"],
  ["skill-insight", "wis"],
  ["skill-intimidation", "cha"],
  ["skill-investigation", "int"],
  ["skill-medicine", "wis"],
  ["skill-nature", "int"],
  ["skill-perception", "wis"],
  ["skill-performance", "cha"],
  ["skill-persuasion", "cha"],
  ["skill-religion", "int"],
  ["skill-sleight-of-hand", "dex"],
  ["skill-stealth", "dex"],
  ["skill-survival", "wis"],
];

function makeSheetStats() {
  for (let i = 0; i < 6; i++) {
    document.getElementById(`${abilityArray[i]}-stat`).innerHTML =
      finalStats[abilityArray[i]] + racialBonus[abilityArray[i]];
    document.getElementById(`${abilityArray[i]}-mod`).innerHTML = Math.floor(
      (finalStats[abilityArray[i]] + racialBonus[abilityArray[i]] - 10) / 2
    );
  }
}

function makeSheetSavingThrows() {
  for (let i = 0; i < 6; i++) {
    if (
      proficiencyData[`saving-throw-${abilityArray[i]}`].proficiencyBonus ===
      true
    ) {
      document
        .getElementById(`${abilityArray[i]}-saving-throw-prof`)
        .classList.add("selected");
      document.getElementById(`${abilityArray[i]}-saving-throw-mod`).innerHTML =
        Math.floor(
          (finalStats[abilityArray[i]] + racialBonus[abilityArray[i]] - 10) / 2
        ) + profBonus;
    } else {
      document.getElementById(`${abilityArray[i]}-saving-throw-mod`).innerHTML =
        Math.floor(
          (finalStats[abilityArray[i]] + racialBonus[abilityArray[i]] - 10) / 2
        );
    }
  }
}

function makeSkillSheet() {
  const skillSheet = document.getElementById("sheet-skills");
  for (let i = 0; i < 18; i++) {
    if (proficiencyData[skillList[i][0]].proficiencyBonus === true) {
      skillSheet.innerHTML += `
                <div class="skill-div">
                    <div id="${skillList[i][0]}" class="bubble selected"></div>
                    <div id="${skillList[i][0]}-mod">${
        Math.floor(
          (finalStats[skillList[i][1]] + racialBonus[skillList[i][1]] - 10) / 2
        ) + profBonus
      }</div>
                    <div>${proficiencyData[skillList[i][0]].name} (${skillList[
        i
      ][1].toUpperCase()})</div>
            </div>
            `;
    } else {
      skillSheet.innerHTML += `
                <div class="skill-div">
                    <div id="${skillList[i][0]}" class="bubble selected"></div>
                    <div id="${skillList[i][0]}-mod">${Math.floor(
        (finalStats[skillList[i][1]] + racialBonus[skillList[i][1]] - 10) / 2
      )}</div>
                    <div>${proficiencyData[skillList[i][0]].name} (${skillList[
        i
      ][1].toUpperCase()})</div>
            </div>
            `;
    }
  }
}

function makeTraits() {
  for (let i = 0; i < raceData[selectedRace].traits.length; i++) {
    document.getElementById("sheet-traits").innerHTML += `
        <p>${raceData[selectedRace].traits[i].name}</p>
    `;
  }
}
