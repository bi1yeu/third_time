let workTime = 0;
let breakTime = 0;
let isWorking = true;
let timer;

onmessage = function (e) {
  const command = e.data.command;

  if (command === "startWork") {
    clearInterval(timer);
    isWorking = true;
    workTime = e.data.workTime;
    timer = setInterval(() => {
      workTime++;
      breakTime += 1.0 / 3.0;
      postMessage({ workTime, breakTime });
    }, 1000);
  }

  if (command === "startBreak") {
    clearInterval(timer);
    isWorking = false;
    breakTime = e.data.breakTime;
    workTime = 0;
    postMessage({ workTime, breakTime });
    timer = setInterval(() => {
      breakTime--;
      if (Math.floor(breakTime) === 0) {
        postMessage({ breakTime, alert: true });
      } else {
        postMessage({ workTime, breakTime });
      }
    }, 1000);
  }

  if (command === "stop") {
    clearInterval(timer);
    workTime = 0;
    breakTime = 0;
    postMessage({ workTime, breakTime });
  }
};
