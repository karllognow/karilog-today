document.addEventListener("DOMContentLoaded", function () {
  const startButtons = document.querySelectorAll(".start-grade-btn");
  const endButtons = document.querySelectorAll(".end-grade-btn");
  const startDisplay = document.getElementById("start-grade");
  const endDisplay = document.getElementById("end-grade");
  const calculateButton = document.getElementById("calculate-button");
  const resultSection = document.getElementById("result");
  const resultList = document.getElementById("material-list");
  const alertMessage = document.getElementById("alert-message");

  let selectedStart = "";
  let selectedEnd = "";

  startButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedStart = button.textContent;
      startDisplay.textContent = selectedStart;
      highlightSelected(startButtons, button);
    });
  });

  endButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedEnd = button.textContent;
      endDisplay.textContent = selectedEnd;
      highlightSelected(endButtons, button);
    });
  });

  function highlightSelected(buttons, selectedButton) {
    buttons.forEach((btn) => btn.classList.remove("selected"));
    selectedButton.classList.add("selected");
  }

  calculateButton.addEventListener("click", () => {
    const monsterName = "タマミツネ";
    const equipmentType = "武器";
    const start = selectedStart;
    const end = selectedEnd;

    const startGrade = start.match(/^\d{1,2}-[1-5]$/) ? start : null;
    const endGrade = end.match(/^\d{1,2}-[1-5]$/) ? end : null;

    if (!startGrade || !endGrade) {
      alertMessage.style.display = "block";
      resultSection.style.display = "none";
      return;
    }

    alertMessage.style.display = "none";

    fetch("monster_materials.json")
      .then((response) => response.json())
      .then((data) => {
        const materials =
          data[monsterName] &&
          data[monsterName][equipmentType] &&
          data[monsterName][equipmentType].materials;

        if (!materials) {
          resultList.innerHTML = "<li>データが見つかりませんでした</li>";
          resultSection.style.display = "block";
          return;
        }

        const startIndex = Object.keys(materials).indexOf(startGrade);
        const endIndex = Object.keys(materials).indexOf(endGrade);

        if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
          alertMessage.style.display = "block";
          resultSection.style.display = "none";
          return;
        }

        const slicedGrades = Object.keys(materials).slice(
          startIndex,
          endIndex + 1
        );

        const totalMaterials = {};

        slicedGrades.forEach((grade) => {
          const gradeMaterials = materials[grade];
          for (const [material, count] of Object.entries(gradeMaterials)) {
            totalMaterials[material] =
              (totalMaterials[material] || 0) + count;
          }
        });

        resultList.innerHTML = "";
        for (const [material, count] of Object.entries(totalMaterials)) {
          const li = document.createElement("li");
          li.textContent = `${material}: ${count}`;
          resultList.appendChild(li);
        }

        resultSection.style.display = "block";
      })
      .catch((error) => {
        console.error("エラー:", error);
        resultList.innerHTML = "<li>計算中にエラーが発生しました</li>";
        resultSection.style.display = "block";
      });
  });
});
