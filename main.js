// 検索ボタンをクリックしたときの処理
document.getElementById('search-button').addEventListener('click', function () {
  const keyword = document.getElementById('search-input').value;
  const resultsContainer = document.getElementById('search-results');

  const monsters = [
    'タマミツネ（武器）', 'タマミツネ（防具）',
    'ティガレックス（武器）', 'ティガレックス（防具）',
    'リオレウス（武器）', 'リオレウス（防具）',
    // 他のモンスター名もここに追加
  ];

  const filtered = monsters.filter(name => name.includes(keyword));
  resultsContainer.innerHTML = '';

  filtered.forEach(name => {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = name;
    resultsContainer.appendChild(tag);
  });
});

// Today・Weekly登録ボタンをクリックしたときの処理
document.getElementById('register-button').addEventListener('click', function () {
  alert("広告を30秒間表示します（※この機能は実装予定）\nToday・Weeklyへ登録しました！");
});
