"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeService = void 0;
class HomeService {
    constructor() {
        this.tasks = [
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
    }
    getAllTasks() {
        return this.tasks;
    }
}
exports.HomeService = HomeService;
