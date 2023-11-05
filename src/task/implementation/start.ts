/**
 * @author WMXPY
 * @namespace Task_Implementation
 * @description Start
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PUB_TASK_TYPE, PubSerializedTask } from "../definition/task";
import { PubTaskBase } from "../task-base";

export class PubStartTask extends PubTaskBase {

    public static fromProcedure(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.START>,
    ): PubStartTask {

        return new PubStartTask(procedure);
    }

    protected constructor(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.START>,
    ) {

        super(PUB_TASK_TYPE.START, procedure);
    }

    public get procedureIdentifier(): string {
        return this._procedure.identifier;
    }

    public serialize(): PubSerializedTask {

        return {};
    }
}
