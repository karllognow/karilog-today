let selectedMaterials = [];
let totalZeny = 0;

document.getElementById("search-button").addEventListener("click", async () => {
  const selectedValue = document.getElementById("monster-select").value;
  if (!selectedValue) return alert("モンスターを選択してください");

  const res = await fetch("monster_materials.json");
  const data = await res.json();
  const materials = data[selectedValue];

  const list = document.getElementById("materials-list");
  list.innerHTML = "";
  totalZeny = 0;
  selectedMaterials = [];

  materials.forEach(item => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = true;
    checkbox.addEventListener("change", () => updateSelected(item, checkbox.checked));

    const label = document.createElement("label");
    label.textContent = `${item.name} × ${item.count}`;
    li.appendChild(checkbox);
    li.appendChild(label);
    list.appendChild(li);

    selectedMaterials.push(item);
    totalZeny += item.zeny || 0;
  });

  document.getElementById("total-zeny").textContent = `合計ゼニー：${totalZeny.toLocaleString()} z`;
});

function updateSelected(item, isChecked) {
  if (isChecked) {
    selectedMaterials.push(item);
    totalZeny += item.zeny || 0;
  } else {
    selectedMaterials = selectedMaterials.filter(m => m.name !== item.name);
    totalZeny -= item.zeny || 0;
  }
  document.getElementById("total-zeny").textContent = `合計ゼニー：${totalZeny.toLocaleString()} z`;
}

document.getElementById("register-button").addEventListener("click", () => {
  const currentGrade = document.getElementById("current-grade").value.trim();
  const targetGrade = document.getElementById("target-grade").value.trim();
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;

  if (!currentGrade || !targetGrade || !startDate || !endDate) {
    alert("すべての項目を入力してください");
    return;
  }

  document.getElementById("register-button").style.display = "none";
  const timerDiv = document.getElementById("ad-timer");
  timerDiv.style.display = "block";

  let timeLeft = 30;
  const interval = setInterval(() => {
    document.getElementById("timer").textContent = timeLeft;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(interval);
      timerDiv.style.display = "none";
      document.getElementById("register-button").style.display = "block";

      const saveData = {
        materials: selectedMaterials,
        zeny: totalZeny,
        currentGrade: currentGrade,
        targetGrade: targetGrade,
        startDate: startDate,
        endDate: endDate,
        dateSaved: new Date().toISOString()
      };

      localStorage.setItem("equipRegister", JSON.stringify(saveData));
      alert("登録が完了しました！（Today・Weeklyに反映予定）");
    }
  }, 1000);
});
