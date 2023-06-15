function nextPage(thisPage, newPage) {
  document.getElementById(thisPage).classList.add("hidden");
  document.getElementById(newPage).classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").innerHTML = "";
  document.getElementById("modal").classList.add("hidden");
  document.getElementById("overlay").classList.add("hidden");
}

function openModal() {
  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("overlay").classList.remove("hidden");
}

function displayInput(input, location, type) {
  document.getElementById(location).innerHTML = `
  Your current ${type} is ${input}.
  `;
  document.getElementById(location).classList.remove("hidden");
}
