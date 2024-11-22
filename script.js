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
      leader: {foot: leadFoot, step: leadStep},
      follower: {foot: followFoot, step: followStep},
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
    row.innerHTML = `<th>${i + 1}</th>`;
    row.innerHTML += `<td><code>${step.leader.foot}:</code> <span class="step ${step.leader.step}">${stepOptions[step.leader.step]}</span></td>`
    row.innerHTML += `<td><code>${step.follower.foot}:</code> <span class="step ${step.follower.step}">${stepOptions[step.follower.step]}</span></td>`;
    table.appendChild(row);
  })
  console.debug('steps generated', steps);
}

function initialize() {
  console.debug('initialize');
  generateSteps();
  document.getElementById('generate').addEventListener('click', generateSteps);
}

if (document.readyState !== 'loading') {
  initialize();
} else {
  document.addEventListener("DOMContentLoaded", initialize);
}