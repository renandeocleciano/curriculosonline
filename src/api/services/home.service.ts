export class HomeService {
  tasks = [
    {
      name: "learn docker",
      done: false,
    },
    {
      name: "learn awilix",
      done: true,
    },
    {
      name: "learn express",
      done: false,
    },
  ];
  getAllTasks() {
    return this.tasks;
  }
}
