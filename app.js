let foodData = [];

// Ladataan ruoka-aineiden data JSON-tiedostosta
fetch('fooddata.json')
  .then(response => response.json())
  .then(data => {
    foodData = data;
  });

// Poistaa ylimääräiset välilyönnit ja muuntaa pieniksi kirjaimiksi
function normalize(text) {
  return text.trim().toLowerCase();
}

// Haku ja tuloksen esitys
function searchFood() {
  const query = normalize(document.getElementById('search').value);
  const resultDiv = document.getElementById('result');

  const match = foodData.find(item =>
    item.aliases.some(alias => normalize(alias) === query)
  );

  if (match) {
    const colorClass = match.level.toLowerCase();
    resultDiv.innerHTML = `"${match.canonical}" on <span class="${colorClass}">${match.level.toUpperCase()}</span> FODMAP`;
  } else {
    resultDiv.innerHTML = `Ainetta "${query}" ei löytynyt tietokannasta.`;
  }
}

// Mahdollistaa haun myös Enter-näppäimellä
document.getElementById('search').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    searchFood();
  }
});
