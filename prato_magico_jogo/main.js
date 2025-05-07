const allFoods = [
  { emoji: "🍎", name: "Maçã", group: "frutas" },
  { emoji: "🍌", name: "Banana", group: "frutas" },
  { emoji: "🥦", name: "Brócolis", group: "frutas" },
  { emoji: "🍇", name: "Uva", group: "frutas" },
  { emoji: "🍚", name: "Arroz", group: "carboidratos" },
  { emoji: "🍞", name: "Pão", group: "carboidratos" },
  { emoji: "🥔", name: "Batata", group: "carboidratos" },
  { emoji: "🍝", name: "Macarrão", group: "carboidratos" },
  { emoji: "🍗", name: "Frango", group: "proteinas" },
  { emoji: "🥩", name: "Carne", group: "proteinas" },
  { emoji: "🥚", name: "Ovo", group: "proteinas" },
  { emoji: "🧀", name: "Queijo", group: "proteinas" },
  { emoji: "🍬", name: "Doce", group: "outros" },
  { emoji: "🍫", name: "Chocolate", group: "outros" },
  { emoji: "🥤", name: "Refrigerante", group: "outros" },
  { emoji: "🍪", name: "Biscoito", group: "outros" }
];

function generateFoods() {
  const container = document.getElementById('foods');
  container.innerHTML = '';
  const shuffled = allFoods.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 6);
  selected.forEach(food => {
    const div = document.createElement('div');
    div.className = 'food';
    div.draggable = true;
    div.dataset.group = food.group;
    div.textContent = `${food.emoji} ${food.name}`;
    div.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', JSON.stringify({ group: food.group, html: e.target.outerHTML }));
    });
    container.appendChild(div);
  });

  document.querySelectorAll('.zone').forEach(zone => zone.innerHTML = '');
  document.getElementById('feedback').textContent = '';
}

const zones = document.querySelectorAll('.zone');
zones.forEach(zone => {
  zone.addEventListener('dragover', (e) => e.preventDefault());
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    const correctZone = zone.dataset.zone;
    if (data.group === correctZone) {
      zone.classList.add('highlight');
      setTimeout(() => zone.classList.remove('highlight'), 500);
    }
    zone.innerHTML += data.html;
  });
});

function checkPlate() {
  let counts = { frutas: 0, carboidratos: 0, proteinas: 0, outros: 0 };
  zones.forEach(zone => {
    const group = zone.dataset.zone;
    const items = zone.querySelectorAll('.food');
    counts[group] = items.length;
  });

  let feedback = '';
  if (counts.frutas >= 1 && counts.carboidratos >= 1 && counts.proteinas >= 1) {
    feedback = 'Parabéns! Seu prato está equilibrado e nutritivo! 🥗';
  } else {
    feedback = 'Tente incluir um alimento de cada grupo: frutas/vegetais, carboidratos e proteínas.';
  }
  if (counts.outros > 1) {
    feedback += ' 🍬 Lembre-se: doces são gostosos, mas devem ser consumidos com moderação.';
  }

  document.getElementById('feedback').textContent = feedback;
}

generateFoods();
