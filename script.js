const stepOptions = {
  stay: 'Stay',
  transfer: 'Weight Transfer',
  open: 'Open Step',
  front: 'Front Cross',
  back: 'Back Cross',
};

function switchFoot(foot) {
  return foot === 'RF' ? 'LF' : 'RF';
}

function randomSteps(number) {
  let steps = [];
  let leadFoot = 'RF';
  let followFoot = 'LF';
  for (let i = 0; i < number; i++) {
    let leadStep = Object.keys(stepOptions)[Math.floor(Math.random() * 5)];
    let followStep = Object.keys(stepOptions)[Math.floor(Math.random() * 5)];
    if (leadStep !== 'stay') leadFoot = switchFoot(leadFoot);
    if (followStep !== 'stay') followFoot = switchFoot(followFoot);
    steps.push({
      leader: `<code>${leadFoot}:</code> <span class="step ${leadStep}">${stepOptions[leadStep]}</span>`,
      follower: `<code>${followFoot}:</code> <span class="step ${followStep}">${stepOptions[followStep]}</span>`,
    });
  }
  return steps;
}

function generateSteps() {
  let number = document.getElementById('count').value;
  let table = document.getElementById('steps');
  table.innerHTML = '';

  let steps = randomSteps(number);
  steps.forEach((step, i) => {
    let row = document.createElement('tr');
    row.innerHTML = `<th>${i + 1}</th><td>${step.leader}</td><td>${step.follower}</td>`;
    table.appendChild(row);
  })
}

document.addEventListener("DOMContentLoaded", function() {
  generateSteps();
  document.getElementById('generate').addEventListener('click', generateSteps);
});