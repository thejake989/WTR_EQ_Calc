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
function calculateAirMovers() {
  const lengthInput = document.getElementById("length").value;
  const widthInput = document.getElementById("width").value;
  const bumpOuts = parseInt(document.getElementById("bumpOuts").value);

  const length = parseDimension(lengthInput);
  const width = parseDimension(widthInput);

  if (length === null || width === null) {
    alert("Please enter valid room dimensions (e.g., 14'3\").");
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

function clearData() {
  document.getElementById("length").value = "";
  document.getElementById("width").value = "";
  document.getElementById("bumpOuts").value = "";
  document.getElementById("result").innerHTML = "";
}
