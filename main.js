document.addEventListener("DOMContentLoaded", function () {
  const currentGrid = document.getElementById("current-grade-grid");
  const targetGrid = document.getElementById("target-grade-grid");
  const materialList = document.getElementById("material-list");
  const calcBtn = document.getElementById("calculate-btn");

  const materialSection = document.getElementById("material-list");
  materialSection.style.display = "none";

  const gradeRange = generateGrades("5-1", "10-5");

  function generateGrades(start, end) {
    const grades = [];
    const [startMajor, startMinor] = start.split("-").map(Number);
    const [endMajor, endMinor] = end.split("-").map(Number);
    for (let major = startMajor; major <= endMajor; major++) {
      for (let minor = 1; minor <= 5; minor++) {
        if (major === startMajor && minor < startMinor) continue;
        if (major === endMajor && minor > endMinor) break;
        grades.push(`${major}-${minor}`);
      }
    }
    return grades;
  }

  function createGradeButtons(container, name) {
    container.innerHTML = "";
    gradeRange.forEach(grade => {
      const btn = document.createElement("button");
      btn.textContent = grade;
      btn.classList.add("grade-btn");
      btn.addEventListener("click", function () {
        container.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        container.setAttribute("data-selected", grade);
      });
      container.appendChild(btn);
    });
  }

  createGradeButtons(currentGrid, "current");
  createGradeButtons(targetGrid, "target");

  calcBtn.addEventListener("click", function () {
    const monster = "タマミツネ";
    const type = "武器";

    const current = currentGrid.getAttribute("data-selected");
    const target = targetGrid.getAttribute("data-selected");

    if (!current || !target) {
      alert("正しいグレード範囲を選択してください。");
      return;
    }

    const materials = calculateMaterials(monster, type, current, target);
    if (!materials) {
      alert("素材情報が見つかりません。");
      return;
    }

    displayMaterials(materials);
  });

  function calculateMaterials(monster, type, current, target) {
    // 仮データ（本番はJSON連携で置き換え）
    const dummyData = {
      "タマミツネ_武器": {
        "5-1": { "泡狐竜の鱗": 2, "泡狐竜の爪": 1, "ゼニー": 1000 },
        "5-2": { "泡狐竜の鱗": 3, "泡狐竜の爪": 2, "ゼニー": 1500 },
        "5-3": { "泡狐竜の鱗": 3, "泡狐竜の爪": 2, "ゼニー": 1800 },
        "5-4": { "泡狐竜の鱗": 4, "泡狐竜の爪": 2, "ゼニー": 2000 },
        "5-5": { "泡狐竜の鱗": 5, "泡狐竜の爪": 3, "ゼニー": 2200 },
        "6-1": { "泡狐竜の鱗": 6, "泡狐竜の爪": 3, "ゼニー": 2400 },
        "6-2": { "泡狐竜の鱗": 7, "泡狐竜の爪": 3, "ゼニー": 2600 },
        "6-3": { "泡狐竜の鱗": 8, "泡狐竜の爪": 4, "ゼニー": 2800 },
        "10-5": { "泡狐竜の鱗": 10, "泡狐竜の爪": 5, "ゼニー": 5000 }
      }
    };

    const key = `${monster}_${type}`;
    const currentIdx = gradeRange.indexOf(current);
    const targetIdx = gradeRange.indexOf(target);

    if (currentIdx === -1 || targetIdx === -1 || currentIdx >= targetIdx) return null;

    const result = {};
    for (let i = currentIdx; i < targetIdx; i++) {
      const stage = gradeRange[i + 1];
      const data = dummyData[key]?.[stage];
      if (!data) continue;
      for (const mat in data) {
        result[mat] = (result[mat] || 0) + data[mat];
      }
    }

    return result;
  }

  function displayMaterials(materials) {
    const ul = document.createElement("ul");
    for (const key in materials) {
      const li = document.createElement("li");
      li.textContent = `${key} ×${materials[key]}`;
      ul.appendChild(li);
    }
    materialList.innerHTML = "<h3>必要素材一覧</h3>";
    materialList.appendChild(ul);
    materialSection.style.display = "block";
  }
});
