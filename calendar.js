document.addEventListener("DOMContentLoaded", function () {
  const monthLabel = document.getElementById("monthLabel");
  const grid = document.querySelector(".calendar-grid");

  let date = new Date();

  function renderCalendar() {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = (firstDay.getDay() + 6) % 7;

    monthLabel.textContent = `${year}年${month + 1}月`;
    grid.querySelectorAll(".day-cell").forEach(e => e.remove());

    for (let i = 0; i < startDay; i++) {
      const empty = document.createElement("div");
      empty.className = "day-cell";
      grid.appendChild(empty);
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      const cell = document.createElement("div");
      cell.className = "day-cell";
      cell.textContent = d;
      grid.appendChild(cell);
    }
  }

  document.getElementById("prevMonth").onclick = () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
  };

  document.getElementById("nextMonth").onclick = () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
  };

  renderCalendar();
});