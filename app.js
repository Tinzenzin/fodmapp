let foodData = [];

// Load food data
fetch('fooddata.json')
  .then(response => response.json())
  .then(data => {
    foodData = data;
  });

// Normalize input
function normalize(text) {
  return text.trim().toLowerCase();
}

// Perform search
function searchFood() {
  const query = normalize(document.getElementById('search').value);
  const resultDiv = document.getElementById('result');

  const match = foodData.find(item =>
    item.aliases.some(alias => normalize(alias) === query)
  );

  if (match) {
    const colorClass = match.level.toLowerCase();
    const levelText = match.level.toUpperCase();
    resultDiv.innerHTML = `"${match.canonical}" on <span class="${colorClass}">${levelText}</span> FODMAP`;
  } else {
    resultDiv.innerHTML = `Ainetta "${query}" ei löytynyt tietokannasta.`;
  }
}

// Enable Enter key
document.getElementById('search').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    searchFood();
  }
});
