const monsterMaterials = {
  tamamitsune: {
    weapon: {
      "4-1": { "泡狐竜の鱗": 3, "泡狐竜の爪": 2, "精錬材": 2, "ゼニー": 1000 },
      "4-2": { "泡狐竜の鱗": 2, "精錬材": 1, "ゼニー": 1500 },
      "10-5": { "泡狐竜の紫毛": 5, "精錬材": 3, "ゼニー": 9000 }
      // 中略
    },
    armor: {
      // 防具データ（未記入）
    }
  }
};

document.getElementById('search-button').addEventListener('click', () => {
  const monster = document.getElementById('monster-select').value;
  const type = document.getElementById('type-select').value;
  const current = document.getElementById('current-grade').value;
  const target = document.getElementById('target-grade').value;

  if (!monster || !type || !current || !target) {
    alert('すべての項目を入力してください');
    return;
  }

  const allGrades = Object.keys(monsterMaterials[monster][type]);
  const currentIndex = allGrades.indexOf(current);
  const targetIndex = allGrades.indexOf(target);

  if (currentIndex === -1 || targetIndex === -1 || currentIndex >= targetIndex) {
    alert('グレードの入力が正しくありません');
    return;
  }

  const totals = {};
  for (let i = currentIndex + 1; i <= targetIndex; i++) {
    const grade = allGrades[i];
    const materials = monsterMaterials[monster][type][grade];
    for (const key in materials) {
      totals[key] = (totals[key] || 0) + materials[key];
    }
  }

  const resultDiv = document.getElementById('material-list');
  resultDiv.innerHTML = '<h3>必要素材:</h3><ul>' +
    Object.entries(totals).map(([key, val]) => `<li>${key}: ${val}</li>`).join('') +
    '</ul>';
});

document.getElementById('register-button').addEventListener('click', () => {
  alert("仮登録処理（Today/Weekly連携は次工程で実装）");
});
