document.getElementById("calculate-button").addEventListener("click", function () {
  const monsterName = document.getElementById("monster-name").value.trim();
  const equipType = document.getElementById("equip-type").value;
  const currentGrade = document.getElementById("current-grade").value.trim();
  const targetGrade = document.getElementById("target-grade").value.trim();
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;

  if (!monsterName || !equipType || !currentGrade || !targetGrade || !startDate || !endDate) {
    alert("すべての項目を入力してください");
    return;
  }

  // グレード形式チェック（例: 5-1 〜 10-5）
  const gradePattern = /^([4-9]|10)-[1-5]$/;
  if (!gradePattern.test(currentGrade) || !gradePattern.test(targetGrade)) {
    alert("グレードの入力が正しくありません（例：5-1）");
    return;
  }

  // 数値として比較
  const gradeToNumber = (grade) => {
    const [level, step] = grade.split("-").map(Number);
    return (level - 1) * 5 + step;
  };

  const currentGradeNum = gradeToNumber(currentGrade);
  const targetGradeNum = gradeToNumber(targetGrade);

  if (currentGradeNum >= targetGradeNum) {
    alert("目標グレードは現在のグレードより高くしてください");
    return;
  }

  // マスターデータ取得
  const materialList = monsterMaterials[monsterName]?.[equipType];
  if (!materialList) {
    alert("マスターデータが見つかりません");
    return;
  }

  let requiredMaterials = {};
  let totalZenny = 0;

  for (let i = currentGradeNum + 1; i <= targetGradeNum; i++) {
    const gradeKey = `G${Math.floor((i - 1) / 5) + 1}-${((i - 1) % 5) + 1}`;
    const gradeData = materialList[gradeKey];

    if (!gradeData) continue;

    gradeData.materials.forEach((item) => {
      requiredMaterials[item.name] = (requiredMaterials[item.name] || 0) + item.count;
    });
    totalZenny += gradeData.zenny;
  }

  // 表示
  const listElement = document.getElementById("material-list");
  listElement.innerHTML = "";

  for (const name in requiredMaterials) {
    const li = document.createElement("li");
    li.textContent = `${name} × ${requiredMaterials[name]}`;
    listElement.appendChild(li);
  }

  const zennyElement = document.createElement("li");
  zennyElement.textContent = `ゼニー × ${totalZenny}`;
  listElement.appendChild(zennyElement);

  // 日付保存 → Weekly・Today に反映処理（仮）
  console.log("Start:", startDate, "End:", endDate);
});
