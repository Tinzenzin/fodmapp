let foodData = [];

fetch('fooddata.json')
  .then(response => response.json())
  .then(data => {
    foodData = data;
  });

function normalize(text) {
  return text.trim().toLowerCase();
}

function searchFood() {
  const query = normalize(document.getElementById('search').value);
  const match = foodData.find(item => item.aliases.some(alias => normalize(alias) === query));

  const resultDiv = document.getElementById('result');
  if (match) {
    let colorClass = match.level.toLowerCase();
    resultDiv.innerHTML = `"${match.canonical}" on <span class="${colorClass}">${match.level.toUpperCase()}</span> FODMAP`;
  } else {
    resultDiv.innerHTML = "Ainetta ei löytynyt tietokannasta.";
  }
}
