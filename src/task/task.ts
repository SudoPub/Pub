/**
 * @author WMXPY
 * @namespace Task
 * @description Task
 */

import { UUIDVersion1 } from "@sudoo/uuid";
import { PubProcedureConfiguration } from "../procedure/definition/configuration";
import { IPubTask } from "./definition/task";

export class PubTask implements IPubTask {

    public static fromProcedure(procedure: PubProcedureConfiguration): PubTask {

        return new PubTask(procedure);
    }

    private readonly _taskIdentifier: string;
    private readonly _procedure: PubProcedureConfiguration;

    private constructor(procedure: PubProcedureConfiguration) {

        this._taskIdentifier = UUIDVersion1.generateString();
        this._procedure = procedure;
    }

    public get taskIdentifier(): string {
        return this._taskIdentifier;
    }
    public get procedureIdentifier(): string {
        return this._procedure.identifier;
    }
}
