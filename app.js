
const today = new Date();
let selectedDate = new Date();

function getMonday(d) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - ((day + 6) % 7);
  return new Date(date.setDate(diff));
}

function formatDate(d) {
  return d.toISOString().split("T")[0];
}

function buildCalendar() {
  const monday = getMonday(today);
  document.getElementById("week-range").textContent =
    "週: " + formatDate(monday);

  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(date.getDate() + i);
    const btn = document.createElement("button");
    btn.textContent = formatDate(date).slice(5);
    btn.onclick = () => {
      selectedDate = date;
      loadData();
      updateSelected();
    };
    if (formatDate(date) === formatDate(selectedDate)) {
      btn.classList.add("selected");
    }
    calendar.appendChild(btn);
  }
}

function updateSelected() {
  document.getElementById("selected-date").textContent =
    "記録対象日：" + formatDate(selectedDate);
  loadData();
  buildCalendar();
}

function setStamp(symbol) {
  document.getElementById("selected-stamp").textContent = symbol;
}

function saveData() {
  const dateKey = formatDate(selectedDate);
  const stamp = document.getElementById("selected-stamp").textContent;
  const memo = document.getElementById("memo").value;
  localStorage.setItem("stamp-" + dateKey, stamp);
  localStorage.setItem("memo-" + dateKey, memo);
  alert("保存しました！");
}

function loadData() {
  const dateKey = formatDate(selectedDate);
  document.getElementById("memo").value =
    localStorage.getItem("memo-" + dateKey) || "";
  document.getElementById("selected-stamp").textContent =
    localStorage.getItem("stamp-" + dateKey) || "";
}

window.onload = () => {
  selectedDate = today;
  buildCalendar();
  updateSelected();
};
