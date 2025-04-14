
const today = new Date().toISOString().split("T")[0];
document.getElementById("date").textContent = `今日の日付：${today}`;

const stampKey = `stamp-${today}`;
const memoKey = `memo-${today}`;

document.getElementById("memo").value = localStorage.getItem(memoKey) || "";
document.getElementById("selected-stamp").textContent = localStorage.getItem(stampKey) || "";

function setStamp(symbol) {
  document.getElementById("selected-stamp").textContent = symbol;
}

function saveData() {
  const stamp = document.getElementById("selected-stamp").textContent;
  const memo = document.getElementById("memo").value;
  localStorage.setItem(stampKey, stamp);
  localStorage.setItem(memoKey, memo);
  alert("保存しました！");
}
