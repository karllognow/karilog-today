let goals = [];

function addGoal() {
  const input = document.getElementById('goalInput');
  if (input.value) {
    goals.push(input.value);
    input.value = "";
    renderGoals();
  }
}

function removeGoal() {
  goals.pop();
  renderGoals();
}

function renderGoals() {
  const goalDiv = document.getElementById('goals');
  goalDiv.innerHTML = "";
  goals.forEach((goal, index) => {
    const p = document.createElement("p");
    p.textContent = `${index + 1}. ${goal}`;
    goalDiv.appendChild(p);
  });
}