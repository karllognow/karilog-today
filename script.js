// 仮機能：ボタンでアラート表示（広告表示用）
document.addEventListener("DOMContentLoaded", function () {
  const registerBtn = document.querySelector(".register-btn");
  if (registerBtn) {
    registerBtn.addEventListener("click", () => {
      alert("30秒広告を表示します（※仮処理）\n登録が完了しました。");
    });
  }
});
