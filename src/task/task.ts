/**
 * @author WMXPY
 * @namespace Task
 * @description Task
 */

import { IPubTask } from "./definition/task";

export class PubTask implements IPubTask {

    public static fromIdentifier(identifier: string): PubTask {

        return new PubTask(identifier);
    }

    private readonly _identifier: string;

    private constructor(identifier: string) {

        this._identifier = identifier;
    }

    public get identifier(): string {
        return this._identifier;
    }
}
