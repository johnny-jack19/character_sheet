function makeCharacterSheet() {
  makeSheetStats();
  makeSheetSavingThrows();
  document.getElementById(
    "sheet-prof-bonus"
  ).innerHTML = `<p>+${profBonus}</p>`;
  makeSkillSheet();
  if (proficiencyData["skill-perception"].proficiencyBonus === true) {
    document.getElementById(
      "sheet-passive-perception"
    ).innerHTML = `<div>Passive WIS Perception </div><div>${
      10 + profBonus + Math.floor((finalStats.wis + racialBonus.wis - 10) / 2)
    }</div>`;
  } else {
    document.getElementById(
      "sheet-passive-perception"
    ).innerHTML = `<div>Passive WIS Perception </div><div>${
      10 + Math.floor((finalStats.wis + racialBonus.wis - 10) / 2)
    }</div>`;
  }
  if (proficiencyData["skill-investigation"].proficiencyBonus === true) {
    document.getElementById(
      "sheet-passive-investigation"
    ).innerHTML = `<div>Passive INT Investigation </div><div>${
      10 + profBonus + Math.floor((finalStats.int + racialBonus.int - 10) / 2)
    }</div>`;
  } else {
    document.getElementById(
      "sheet-passive-investigation"
    ).innerHTML = `<div>Passive INT Investigation </div><div>${
      10 + Math.floor((finalStats.int + racialBonus.int - 10) / 2)
    }</div>`;
  }
  if (proficiencyData["skill-insight"].proficiencyBonus === true) {
    document.getElementById(
      "sheet-passive-insight"
    ).innerHTML = `<div>Passive WIS Insight </div><div>${
      10 + profBonus + Math.floor((finalStats.wis + racialBonus.wis - 10) / 2)
    }</div>`;
  } else {
    document.getElementById(
      "sheet-passive-insight"
    ).innerHTML = `<div>Passive WIS Insight </div><div>${
      10 + Math.floor((finalStats.wis + racialBonus.wis - 10) / 2)
    }</div>`;
  }
  makeTraits();
  makeDefenses();
  makeInfo();
  makeOtherProfs();
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
    if (
      Math.floor(
        (finalStats[abilityArray[i]] + racialBonus[abilityArray[i]] - 10) / 2
      ) < 0
    ) {
      document.getElementById(`${abilityArray[i]}-mod`).innerHTML = Math.floor(
        (finalStats[abilityArray[i]] + racialBonus[abilityArray[i]] - 10) / 2
      );
    } else {
      document.getElementById(
        `${abilityArray[i]}-mod`
      ).innerHTML = `+${Math.floor(
        (finalStats[abilityArray[i]] + racialBonus[abilityArray[i]] - 10) / 2
      )}`;
    }
    document.getElementById(`${abilityArray[i]}-stat`).innerHTML =
      finalStats[abilityArray[i]] + racialBonus[abilityArray[i]];
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
      if (
        Math.floor(
          (finalStats[abilityArray[i]] + racialBonus[abilityArray[i]] - 10) / 2
        ) +
          profBonus <
        0
      ) {
        document.getElementById(
          `${abilityArray[i]}-saving-throw-mod`
        ).innerHTML =
          Math.floor(
            (finalStats[abilityArray[i]] + racialBonus[abilityArray[i]] - 10) /
              2
          ) + profBonus;
      } else {
        document.getElementById(
          `${abilityArray[i]}-saving-throw-mod`
        ).innerHTML = `+${
          Math.floor(
            (finalStats[abilityArray[i]] + racialBonus[abilityArray[i]] - 10) /
              2
          ) + profBonus
        }`;
      }
    } else {
      if (
        Math.floor(
          (finalStats[abilityArray[i]] + racialBonus[abilityArray[i]] - 10) / 2
        ) < 0
      ) {
        document.getElementById(
          `${abilityArray[i]}-saving-throw-mod`
        ).innerHTML = Math.floor(
          (finalStats[abilityArray[i]] + racialBonus[abilityArray[i]] - 10) / 2
        );
      } else {
        document.getElementById(
          `${abilityArray[i]}-saving-throw-mod`
        ).innerHTML = `+${Math.floor(
          (finalStats[abilityArray[i]] + racialBonus[abilityArray[i]] - 10) / 2
        )}`;
      }
    }
  }
}

function makeSkillSheet() {
  const skillSheet = document.getElementById("sheet-skills");
  skillSheet.innerHTML = `<h3>Skills</h3>`;
  for (let i = 0; i < 18; i++) {
    if (proficiencyData[skillList[i][0]].proficiencyBonus === true) {
      skillSheet.innerHTML += `
        <div class="skill-div">
          <div id="${skillList[i][0]}" class="bubble selected"></div>
          <div class="skill-gov">${skillList[i][1].toUpperCase()}</div>
          <div class="skill-name">${proficiencyData[skillList[i][0]].name}</div>
          <div id="${skillList[i][0]}-mod" class="skill-mod">${
        Math.floor(
          (finalStats[skillList[i][1]] + racialBonus[skillList[i][1]] - 10) / 2
        ) + profBonus
      }</div>
        </div>
      `;
      if (
        Math.floor(
          (finalStats[skillList[i][1]] + racialBonus[skillList[i][1]] - 10) / 2
        ) +
          profBonus >=
        0
      ) {
        document.getElementById(`${skillList[i][0]}-mod`).innerHTML = `+${
          Math.floor(
            (finalStats[skillList[i][1]] + racialBonus[skillList[i][1]] - 10) /
              2
          ) + profBonus
        }`;
      }
    } else {
      skillSheet.innerHTML += `
        <div class="skill-div">
          <div id="${skillList[i][0]}" class="bubble"></div>
          <div class="skill-gov">${skillList[i][1].toUpperCase()}</div>
          <div class="skill-name">${proficiencyData[skillList[i][0]].name}</div>
          <div id="${skillList[i][0]}-mod" class="skill-mod">${Math.floor(
        (finalStats[skillList[i][1]] + racialBonus[skillList[i][1]] - 10) / 2
      )}</div>
        </div>
      `;
      if (
        Math.floor(
          (finalStats[skillList[i][1]] + racialBonus[skillList[i][1]] - 10) / 2
        ) >= 0
      ) {
        document.getElementById(
          `${skillList[i][0]}-mod`
        ).innerHTML = `+${Math.floor(
          (finalStats[skillList[i][1]] + racialBonus[skillList[i][1]] - 10) / 2
        )}`;
      }
    }
  }
}

function makeTraits() {
  document.getElementById("sheet-traits").innerHTML = `<h3>Traits</h3>`;
  for (let i = 0; i < raceData[selectedRace].traits.length; i++) {
    document.getElementById("sheet-traits").innerHTML += `
        <p>${raceData[selectedRace].traits[i].name}</p>
    `;
  }
}

function makeDefenses() {
  let hitDie = classData[selectedClass].hit_die;
  document.getElementById("hp-max").innerHTML = `<p>${
    hitDie + Math.floor((finalStats.con + racialBonus.con - 10) / 2)
  }</p>`;
  document.getElementById("total-hit-die").innerHTML = `<p>1 d${hitDie}</p>`;
  document.getElementById("init-mod").innerHTML = `<p>+${Math.floor(
    (finalStats.dex + racialBonus.dex - 10) / 2
  )}</p>`;
  document.getElementById(
    "speed-mod"
  ).innerHTML = `<p>${raceData[selectedRace].speed} ft.</p>`;
}

function makeInfo() {
  document.getElementById("sheet-name").innerHTML = selectedName;
  document.getElementById("sheet-class").innerHTML =
    classData[selectedClass].name;
  document.getElementById("sheet-race").innerHTML = raceData[selectedRace].name;
  document.getElementById("sheet-align").innerHTML =
    alignmentData[selectedAlignment].name;
}

function makeOtherProfs() {
  let profArray = Object.keys(proficiencyData);
  document.getElementById("sheet-other-profs").innerHTML =
    "<h3>Proficiencies</h3>";
  profArray.forEach((prof) => {
    if (
      prof.slice(0, 5) !== "skill" &&
      prof.slice(0, 6) !== "saving" &&
      proficiencyData[prof].proficiencyBonus === true
    ) {
      document.getElementById(
        "sheet-other-profs"
      ).innerHTML += `<p>${proficiencyData[prof].name}</p>`;
    }
  });
}
