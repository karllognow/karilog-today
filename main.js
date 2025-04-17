// 仮のマスターデータ（例：タマミツネ武器）
const mockData = {
  'タマミツネ（武器）': {
    '5-1': { '泡狐竜の鱗': 2, '竜骨【中】': 1 },
    '5-2': { '泡狐竜の鱗': 3, '泡狐竜の爪': 1 },
    '5-3': { '泡狐竜の上鱗': 2, '竜骨【大】': 1 },
    '6-1': { '泡狐竜の爪': 2, '泡狐竜の甲殻': 1 },
    '6-2': { '泡狐竜の爪': 3, '竜骨【大】': 2 },
    '7-1': { '泡狐竜の上鱗': 4, '泡狐竜の鋭爪': 2 },
    '8-1': { '泡狐竜の鋭爪': 5, '泡狐竜の紫鱗': 2 },
    '9-1': { '泡狐竜の紫鱗': 6, '泡狐竜の上甲殻': 3 },
    '10-1': { '泡狐竜の上甲殻': 5, '竜玉': 1 }
  }
};

// 計算ボタン処理
document.getElementById('calc-button').addEventListener('click', function () {
  const monster = document.getElementById('searchInput').value + '（武器）';
  const from = document.getElementById('currentGrade').value;
  const to = document.getElementById('targetGrade').value;
  const output = document.getElementById('materialList');
  output.innerHTML = '';

  const data = mockData[monster];
  if (!data || !data[from] || !data[to]) {
    output.textContent = '対応するデータが見つかりませんでした。';
    return;
  }

  // グレード順を取得（仮に並べ替えのない連続グレードと仮定）
  let collect = {};
  let record = false;
  for (const grade in data) {
    if (grade === from) record = true;
    if (record) {
      const mats = data[grade];
      for (const name in mats) {
        collect[name] = (collect[name] || 0) + mats[name];
      }
    }
    if (grade === to) break;
  }

  for (const name in collect) {
    const item = document.createElement('div');
    item.innerHTML = `<label><input type="checkbox"> ${name} × ${collect[name]}</label>`;
    output.appendChild(item);
  }
});

// 登録ボタン処理（広告処理風アラート）
document.getElementById('register-button').addEventListener('click', function () {
  alert("広告を30秒間表示します（※この機能は実装予定）\nToday・Weeklyへ登録しました！");
});
