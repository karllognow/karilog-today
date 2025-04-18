let currentGrade = null;
let targetGrade = null;

document.addEventListener("DOMContentLoaded", () => {
  createGradeButtons();
});

function createGradeButtons() {
  const grid = document.getElementById("grade-selection");
  grid.innerHTML = "";

  const start = 5; // タマミツネは5-1から
  const end = 10;

  for (let g = start; g <= end; g++) {
    for (let s = 1; s <= 5; s++) {
      const grade = `${g}-${s}`;
      const btn = document.createElement("button");
      btn.textContent = grade;

      btn.addEventListener("click", () => {
        if (!currentGrade) {
          currentGrade = grade;
          btn.classList.add("selected");
        } else if (!targetGrade) {
          targetGrade = grade;
          btn.classList.add("selected");
        } else {
          currentGrade = grade;
          targetGrade = null;
          [...grid.children].forEach(b => b.classList.remove("selected"));
          btn.classList.add("selected");
        }
        document.getElementById("grade-range").textContent = `${currentGrade || "未選択"} → ${targetGrade || "未選択"}`;
      });

      grid.appendChild(btn);
    }
  }
}

function calculateMaterials() {
  if (!currentGrade || !targetGrade) {
    alert("現在・目標グレードを選んでください。");
    return;
  }

  const list = document.getElementById("material-list");
  list.innerHTML = `
    <p><strong>タマミツネ 武器</strong>（仮データ）</p>
    <ul>
      <li>泡狐竜の鱗 ×10</li>
      <li>泡狐竜の甲殻 ×12</li>
      <li>泡狐竜の鋭爪 ×6</li>
      <li>竜骨【中】 ×5</li>
      <li>洗練された鉱石 ×8</li>
    </ul>
    <p><strong>必要ゼニー:</strong> 36,000 z</p>
  `;
}

function registerToTabs() {
  alert("TodayとWeeklyに登録しました！（仮動作）");
}
