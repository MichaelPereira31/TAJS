import Task from "./taks.js";

const oneSecond = 1000;
const runInASecs = new Date(Date.now() + oneSecond);
const runInTwoSecs = new Date(Date.now() + oneSecond * 2);
const runInThreeSecs = new Date(Date.now() + oneSecond * 3);

const task = new Task();

task.save({
  name: 'task1',
  dueAt : runInASecs,
  fn: () => console.log('taks1 executed')
})

task.save({
  name: 'task2',
  dueAt : runInTwoSecs,
  fn: () => console.log('taks2 executed')
})

task.save({
  name: 'task3',
  dueAt : runInThreeSecs,
  fn: () => console.log('taks3 executed')
})

task.run(runInASecs); 