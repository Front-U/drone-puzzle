
let svgDoc = null;
let previousState = {};

function fetchAndUpdate() {
  fetch('data.json?ts=' + Date.now())
    .then(response => response.json())
    .then(json => {
      if (document.getElementById("drone-svg").contentDocument) {
        svgDoc = document.getElementById("drone-svg").contentDocument;
        applyData(json);
      } else {
        document.getElementById("drone-svg").addEventListener("load", () => {
          svgDoc = document.getElementById("drone-svg").contentDocument;
          applyData(json);
        });
      }
    })
    .catch(error => {
      console.error("Помилка при завантаженні даних:", error);
    });
}

function applyData(json) {
  const data = json.puzzles || [];
  const thanks = json.thanks || [];

  data.forEach(item => {
    const id = item.id;
    const color = item.color;
    const name = item.name;

    const puzzle = svgDoc.getElementById(id);
    const text = svgDoc.getElementById(`text-${id.slice(-2)}`);

    const was = previousState[id];
    const changed = !was || was.color !== color || was.name !== name;

    if (puzzle && changed) {
      puzzle.setAttribute('fill', color);
      puzzle.classList.add("puzzle-highlight");
      setTimeout(() => puzzle.classList.remove("puzzle-highlight"), 2000);
      previousState[id] = { color, name };
    }

    if (text) {
      text.textContent = name;
    }
  });

  const list = document.getElementById("donors-list");
  if (list) {
    list.innerHTML = "";
    thanks.forEach(name => {
      const li = document.createElement("li");
      li.textContent = name;
      list.appendChild(li);
    });
  }

  const sum = data.length * 2500 + thanks.length * 2499;
  const totalSum = document.getElementById("total-sum");
  if (totalSum) {
    totalSum.textContent = "Зібрано: " + sum.toLocaleString("uk-UA") + " грн";
  }
}

window.addEventListener("DOMContentLoaded", fetchAndUpdate);
