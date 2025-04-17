// モンスター別の仮素材データ（実際はマスターデータと連携予定）
const monsterMaterials = {
  "タマミツネ": [
    { name: "泡狐竜の鱗", perUpgrade: 3 },
    { name: "泡狐竜の爪", perUpgrade: 2 },
    { name: "竜骨【中】", perUpgrade: 1 }
  ],
  "ティガレックス": [
    { name: "轟竜の甲殻", perUpgrade: 4 },
    { name: "轟竜の爪", perUpgrade: 3 },
    { name: "防具精錬材", perUpgrade: 2 }
  ],
  "リオレウス": [
    { name: "火竜の鱗", perUpgrade: 3 },
    { name: "火竜の翼", perUpgrade: 2 },
    { name: "竜玉", perUpgrade: 1 }
  ]
};

// グレード文字列 → 数値に変換（例：5-1 → 21、10-5 → 50）
function gradeToIndex(gradeStr) {
  const match = gradeStr.match(/^(\d+)-(\d+)$/);
  if (!match) return null;
  const major = parseInt(match[1]);
  const minor = parseInt(match[2]);
  return (major - 1) * 5 + minor;
}

// 素材一覧の描画
function displayMaterials(monster, currentGrade, targetGrade) {
  const container = document.getElementById("material-list");
  container.innerHTML = "";

  const current = gradeToIndex(currentGrade);
  const target = gradeToIndex(targetGrade);

  if (current === null || target === null || target <= current) {
    container.innerHTML = "<p style='color: red;'>グレードの入力を確認してください。</p>";
    return;
  }

  const upgradesNeeded = target - current;
  const materials = monsterMaterials[monster];
  if (!materials) {
    container.innerHTML = "<p style='color: red;'>モンスターの素材データがありません。</p>";
    return;
  }

  const list = document.createElement("ul");
  materials.forEach(mat => {
    const total = mat.perUpgrade * upgradesNeeded;
    const li = document.createElement("li");
    li.textContent = `${mat.name}：${total}個`;
    list.appendChild(li);
  });

  container.appendChild(list);
}

// ボタンのイベント設定
document.getElementById("calculate-button").addEventListener("click", () => {
  const monster = document.getElementById("monster-select").value;
  const current = document.getElementById("current-grade").value;
  const target = document.getElementById("target-grade").value;

  displayMaterials(monster, current, target);
});

document.getElementById("register-button").addEventListener("click", () => {
  alert("Today・Weeklyに登録しました（※広告表示は未実装）");
});
