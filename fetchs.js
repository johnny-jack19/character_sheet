const URL = "https://www.dnd5eapi.co";

//*****Get ability score data*****
let abilityScoreData = [];
async function getAbilityScoreData() {
  const abilityScores = await fetch(URL + "/api/ability-scores/");
  const response = await abilityScores.json();
  for (let i = 0; i < response.results.length; i++) {
    const ability = await fetch(URL + response.results[i].url);
    const abilityResponse = await ability.json();
    abilityScoreData[i] = abilityResponse;
  }
  console.log(abilityScoreData);
}

getAbilityScoreData();

//*****Get class data*****
let classData = [];
async function getClassData() {
  const classes = await fetch(URL + "/api/classes/");
  const response = await classes.json();
  for (let i = 0; i < response.results.length; i++) {
    const DDClass = await fetch(URL + response.results[i].url);
    const DDResponse = await DDClass.json();
    classData[i] = DDResponse;
  }
  console.log(classData);
}

getClassData();

//*****Get race data*****
let raceData = [];
async function getRaceData() {
  const races = await fetch(URL + "/api/races/");
  const response = await races.json();
  for (let i = 0; i < response.results.length; i++) {
    const race = await fetch(URL + response.results[i].url);
    const raceResponse = await race.json();
    raceData[i] = raceResponse;
  }
  console.log(raceData);
}

getRaceData();

//*****Get alignment data*****
let alignmentData = [];
async function getAlignmentData() {
  const alignments = await fetch(URL + "/api/alignments/");
  const response = await alignments.json();
  for (let i = 0; i < response.results.length; i++) {
    const alignment = await fetch(URL + response.results[i].url);
    const alignmentResponse = await alignment.json();
    alignmentData[i] = alignmentResponse;
  }
  console.log(alignmentData);
}

getAlignmentData();

//*****Get proficiency data*****
let proficiencyData = {};
async function getProficiencyData() {
  const proficiencies = await fetch(URL + "/api/proficiencies/");
  const response = await proficiencies.json();
  for (let i = 0; i < response.results.length; i++) {
    proficiencyData[response.results[i].index] = {
      name: response.results[i].name,
      proficiencyBonus: false,
    };
    if (response.results[i].index.slice(0, 5) === "skill") {
      proficiencyData[response.results[i].index].name =
        response.results[i].name.slice(7);
    }
  }
  console.log(proficiencyData);
}

getProficiencyData();
