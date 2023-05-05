//Function will allow whole number dimensions to be input.
function parseDimension(dimension) {
  const regex = /^(\d+)'?(\d*)"?$/;
  const match = dimension.match(regex);

  if (match) {
    const feet = parseInt(match[1]);
    const inches = match[2] ? parseInt(match[2]) : 0;
    return feet + inches / 12;
  } else {
    return null;
  }
}

//Function to calculate the number of air movers needed for a given room.
function calculateAirMovers() {
  const lengthInput = document.getElementById("length").value;
  const widthInput = document.getElementById("width").value;
  const bumpOuts = parseInt(document.getElementById("bumpOuts").value);

  const length = parseDimension(lengthInput);
  const width = parseDimension(widthInput);

  if (length === null || width === null) {
    alert("Please enter valid room dimensions (Ft, Inches).");
    return;
  }

  const area = length * width;

  let airMovers = Math.ceil(area / 50) + 1;

  if (bumpOuts && bumpOuts > 0) {
    airMovers += bumpOuts;
  }

  document.getElementById(
    "result"
  ).innerHTML = `You will need ${airMovers} air movers for this room.`;
}

//Clears the data
function clearData() {
  document.getElementById("length").value = "";
  document.getElementById("width").value = "";
  document.getElementById("bumpOuts").value = "";
  document.getElementById("result").innerHTML = "";
}

//Dehumidifier calculator
function calculateDehumidifiers() {
  const lengthInput = document.getElementById("length").value;
  const widthInput = document.getElementById("width").value;
  const ceilingHeightInput = document.getElementById("ceilingHeight").value;
  const dehumidifierCapacityInput = document.getElementById(
    "dehumidifierCapacity"
  ).value;
  const waterDamageClassInput =
    document.getElementById("waterDamageClass").value;
  const dehumidifierPintsPerDayInput = document.getElementById(
    "dehumidifierPintsPerDay"
  ).value;

  const length = parseDimension(lengthInput);
  const width = parseDimension(widthInput);
  const ceilingHeight = parseDimension(ceilingHeightInput);
  const dehumidifierCapacity = parseInt(dehumidifierCapacityInput);
  const waterDamageClass = parseInt(waterDamageClassInput);
  const dehumidifierPintsPerDay = parseInt(dehumidifierPintsPerDayInput);

  if (
    length === null ||
    width === null ||
    ceilingHeight === null ||
    !dehumidifierCapacity ||
    !waterDamageClass ||
    !dehumidifierPintsPerDay
  ) {
    alert(
      "Please enter valid room dimensions, dehumidifier capacity, water damage class, and dehumidifier pints per day."
    );
    return;
  }

  const volume = length * width * ceilingHeight;
  const classDivisor =
    waterDamageClass === 1
      ? 100
      : waterDamageClass === 2
      ? 50
      : waterDamageClass === 3
      ? 40
      : waterDamageClass === 4
      ? 50
      : 0; // Set the class divisor based on the water damage class
  const pintsOfWater = volume / classDivisor;
  const dehumidifiers = Math.ceil(pintsOfWater / dehumidifierPintsPerDay);

  document.getElementById(
    "dehumidifierResult"
  ).innerHTML = `You will need ${dehumidifiers} dehumidifiers for this room with a cubic footage of ${volume} cubic feet.`;
}
