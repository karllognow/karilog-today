const currentGrid = document.getElementById("current-grade");
const targetGrid = document.getElementById("target-grade");
const resultDiv = document.getElementById("result");

let currentSelected = null;
let targetSelected = null;

function createGradeGrid(container, callback) {
  const grades = [];
  for (let i = 5; i <= 10; i++) {
    for (let j = 1; j <= 5; j++) {
      grades.push(`${i}-${j}`);
    }
  }
  grades.forEach(grade => {
    const div = document.createElement("div");
    div.textContent = grade;
    div.addEventListener("click", () => {
      Array.from(container.children).forEach(child => child.classList.remove("selected"));
      div.classList.add("selected");
      callback(grade);
    });
    container.appendChild(div);
  });
}

createGradeGrid(currentGrid, grade => currentSelected = grade);
createGradeGrid(targetGrid, grade => targetSelected = grade);

document.getElementById("calculate").addEventListener("click", () => {
  if (!currentSelected || !targetSelected) {
    resultDiv.innerHTML = "<p style='color:red'>グレードを選択してください。</p>";
    return;
  }

  const data = {
    "5-1": {"素材A": 2, "素材B": 3, "ゼニー": 1000},
    "5-2": {"素材A": 3, "素材B": 4, "ゼニー": 1200},
    "5-3": {"素材A": 4, "素材B": 5, "ゼニー": 1400},
    "5-4": {"素材A": 5, "素材B": 6, "ゼニー": 1600},
    "5-5": {"素材A": 6, "素材B": 7, "ゼニー": 1800},
    "6-1": {"素材A": 7, "素材B": 8, "ゼニー": 2000},
    "6-2": {"素材A": 8, "素材B": 9, "ゼニー": 2200},
    "6-3": {"素材A": 9, "素材B": 10, "ゼニー": 2400},
    "6-4": {"素材A": 10, "素材B": 11, "ゼニー": 2600},
    "6-5": {"素材A": 11, "素材B": 12, "ゼニー": 2800},
    "7-1": {"素材A": 12, "素材B": 13, "ゼニー": 3000}
  };

  const startIndex = Object.keys(data).indexOf(currentSelected);
  const endIndex = Object.keys(data).indexOf(targetSelected);
  if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
    resultDiv.innerHTML = "<p style='color:red'>正しいグレード範囲を選択してください。</p>";
    return;
  }

  const sliced = Object.keys(data).slice(startIndex, endIndex + 1);
  const total = {};
  sliced.forEach(key => {
    const mat = data[key];
    for (let k in mat) {
      total[k] = (total[k] || 0) + mat[k];
    }
  });

  let html = "<h3>必要素材とゼニー</h3><ul>";
  for (let k in total) {
    html += `<li>${k}: ${total[k]}</li>`;
  }
  html += "</ul>";
  resultDiv.innerHTML = html;
});
