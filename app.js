let foodData = [];

// Lataa ruoka-aineet JSON-tiedostosta
fetch('fooddata.json')
  .then(response => response.json())
  .then(data => {
    foodData = data;
  });

// Normalisoi käyttäjän syöte
function normalize(text) {
  return text.trim().toLowerCase();
}

// Haku ja tulostus
function searchFood() {
  const query = normalize(document.getElementById('search').value);
  const resultDiv = document.getElementById('result');

  const match = foodData.find(item =>
    item.aliases.some(alias => normalize(alias) === query)
  );

  if (match) {
    const colorClass = match.level.toLowerCase();
    const levelText = match.level.toUpperCase();
    const description = match.description || "";

    resultDiv.innerHTML = `
      <p>"${match.canonical}" on <span class="${colorClass}">${levelText}</span> FODMAP</p>
      <p>${description}</p>
    `;
  } else {
    resultDiv.innerHTML = `Ainetta "${query}" ei löytynyt tietokannasta.`;
  }
}

// Enter-näppäin aktivoi haun
document.getElementById('search').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    searchFood();
  }
});
