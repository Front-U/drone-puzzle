
let svgDoc = null;
let previousState = {};

function applyData(json) {
  const data = json.puzzles || [];
  const thanks = json.thanks || [];

  // Оновлюємо пазли
  data.forEach(item => {
    const id = item.id;
    const color = item.color;
    const name = item.name;

    const puzzle = svgDoc.getElementById(id);
    const text = svgDoc.getElementById(`text-${id.slice(-2)}`);

    if (puzzle) {
      const was = previousState[id];
      const changed = !was || was.color !== color || was.name !== name;

      if (changed) {
        puzzle.setAttribute('fill', color);
        puzzle.classList.add("puzzle-highlight");

        setTimeout(() => {
          puzzle.classList.remove("puzzle-highlight");
        }, 2000);
      }

      previousState[id] = { color, name };
    }

    if (text) {
      text.textContent = name;
    }
  });

  // Оновлюємо список подяк
  const list = document.getElementById("donors-list");
  list.innerHTML = "";
  [...thanks].reverse().forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name;
    list.appendChild(li);
  });

  // Підрахунок загальної суми
  const total = [...data, ...thanks].reduce((sum, item) => sum + (item.amount || 0), 0);
  document.getElementById("total-sum").textContent = `Зібрано: ${total.toLocaleString("uk-UA")} грн`;
}

function fetchAndUpdate() {
  fetch('data.json?ts=' + Date.now())
    .then(response => response.json())
    .then(json => {
      if (svgDoc) {
        applyData(json);
      }
    })
    .catch(error => {
      console.error("Помилка при завантаженні даних:", error);
    });
}

function init() {
  const svgObject = document.getElementById("drone-svg");

  svgObject.addEventListener("load", () => {
    svgDoc = svgObject.contentDocument;
    fetchAndUpdate();
    setInterval(fetchAndUpdate, 10000);
  });
}

window.addEventListener("DOMContentLoaded", init);
