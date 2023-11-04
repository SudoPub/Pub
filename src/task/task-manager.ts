/**
 * @author WMXPY
 * @namespace Task
 * @description Task Manager
 */

export class PubTaskManager {

    public static create(): PubTaskManager {

        return new PubTaskManager();
    }

    private readonly _tasks: Map<string, string>;

    private constructor() {

        this._tasks = new Map<string, string>();
    }
}
