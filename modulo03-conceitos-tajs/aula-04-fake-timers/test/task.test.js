import { beforeEach, describe ,expect, it, jest } from '@jest/globals'
import Task from '../src/taks.js'
import { setTimeout } from 'node:timers/promises';

describe("Task Test Suite", () => {
  let _task;
  let _logMock;
  beforeEach(() => {
    _logMock = jest.spyOn(console, console.log.name).mockImplementation();

    _task  = new Task();
  })

  it.skip('should only run tasks that are due without fake timers (slow)', async () => {
    /// AAA == Arrange, Act, Assert

    // Arrange
    const tasks= [
      {
        name: 'Task-will-run-in-5-secs',
        dueAt: new Date(Date.now() + 5000),
        fn: jest.fn()
      },
      {
        name: 'Task-will-run-in-10-secs',
        dueAt: new Date(Date.now() + 10000),
        fn: jest.fn()
      },
    ] 

    //Act
    _task.save(tasks.at(0));
    _task.save(tasks.at(1));

    _task.run(200);

    await setTimeout(11e3); //11_000ms
    expect(tasks.at(0).fn).toHaveBeenCalled();
    expect(tasks.at(1).fn).toHaveBeenCalled();
  }, 
  //configurar o timeout para 15s
  15e3)

  it('should only run tasks that are due with fake timers (slow)', async () => {
    jest.useFakeTimers();
    /// AAA == Arrange, Act, Assert

    // Arrange
    const tasks= [
      {
        name: 'Task-will-run-in-5-secs',
        dueAt: new Date(Date.now() + 5000),
        fn: jest.fn()
      },
      {
        name: 'Task-will-run-in-10-secs',
        dueAt: new Date(Date.now() + 10000),
        fn: jest.fn()
      },
    ] 

    //Act
    _task.save(tasks.at(0));
    _task.save(tasks.at(1));

    _task.run(200);

    // Ninnguém executou
    jest.advanceTimersByTime(4e3);
    expect(tasks.at(0).fn).not.toHaveBeenCalled();
    expect(tasks.at(1).fn).not.toHaveBeenCalled();

    // Task 1 executou
    jest.advanceTimersByTime(2e3);
    expect(tasks.at(0).fn).toHaveBeenCalled();
    expect(tasks.at(1).fn).not.toHaveBeenCalled();

    // Task 2 executou
    jest.advanceTimersByTime(4e3);
    expect(tasks.at(1).fn).toHaveBeenCalled();

    jest.useRealTimers();
  })
})