let svgDoc = null;
let previousState = {};

function applyData(json) {
  const data = json.puzzles;
  const thanks = json.thanks;

  data.forEach(item => {
    const id = item.id;
    const color = item.color;
    const name = item.name;

    const puzzle = svgDoc.getElementById(id);
    const text = svgDoc.getElementById(`text-${id.slice(-2)}`);

    if (puzzle) {
      // Перевіряємо, чи щось змінилось
      const was = previousState[id];
      const changed = !was || was.color !== color || was.name !== name;

      if (changed) {
        puzzle.setAttribute('fill', color);
        puzzle.classList.add("puzzle-highlight");

        // Забрати підсвітку через 2 секунди
        setTimeout(() => {
          puzzle.classList.remove("puzzle-highlight");
        }, 2000);
      }

      // Запам’ятовуємо новий стан
      previousState[id] = { color, name };
    }

    if (text) {
      text.textContent = name;
    }
  });

  const list = document.getElementById("donors-list");
  list.innerHTML = "";
  thanks.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    list.appendChild(li);
  });
}

function fetchAndUpdate() {
  fetch('data.json')
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
