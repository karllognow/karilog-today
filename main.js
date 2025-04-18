const monsterName = "タマミツネ";
const equipType = "武器";

// グレード生成（5-1〜10-5まで）
const generateGradeList = () => {
  const grades = [];
  for (let i = 5; i <= 10; i++) {
    for (let j = 1; j <= 5; j++) {
      grades.push(`${i}-${j}`);
    }
  }
  return grades;
};

// モーダル制御
let currentTarget = null;
const modal = document.getElementById("grade-modal");
const gradeGrid = document.getElementById("grade-grid");
const modalTitle = document.getElementById("modal-title");

document.getElementById("current-grade-button").addEventListener("click", () => {
  openModal("現在のグレードを選択", "current-grade");
});

document.getElementById("target-grade-button").addEventListener("click", () => {
  openModal("目標のグレードを選択", "target-grade");
});

document.getElementById("modal-close").addEventListener("click", () => {
  modal.classList.add("hidden");
});

function openModal(title, targetId) {
  modal.classList.remove("hidden");
  modalTitle.textContent = title;
  currentTarget = targetId;
  gradeGrid.innerHTML = "";
  const grades = generateGradeList();
  grades.forEach(grade => {
    const btn = document.createElement("button");
    btn.textContent = grade;
    btn.addEventListener("click", () => {
      document.getElementById(currentTarget + "-button").textContent = grade;
      modal.classList.add("hidden");
    });
    gradeGrid.appendChild(btn);
  });
}

// 計算処理
document.getElementById("calculate-button").addEventListener("click", () => {
  const start = document.getElementById("current-grade-button").textContent;
  const end = document.getElementById("target-grade-button").textContent;
  const startGrade = start.match(/^\d-\d$/) ? start : null;
  const endGrade = end.match(/^\d-\d$/) ? end : null;
  const error = document.getElementById("error-message");
  const list = document.getElementById("material-list");

  if (!startGrade || !endGrade) {
    error.textContent = "正しいグレード範囲を選択してください。";
    list.innerHTML = "";
    return;
  }

  error.textContent = "";

  // モック素材計算
  list.innerHTML = `<h3>必要素材一覧</h3><ul>
    <li>泡狐竜の鱗 ×10</li>
    <li>泡狐竜の爪 ×6</li>
    <li>竜骨【中】×12</li>
    <li>防具精錬材 ×8</li>
    <li>ゼニー：24000z</li>
  </ul>`;
});
