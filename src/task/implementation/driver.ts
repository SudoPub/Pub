/**
 * @author WMXPY
 * @namespace Task_Implementation
 * @description Driver
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PUB_TASK_TYPE, PubSerializedTask } from "../definition/task";
import { PubTaskBase } from "../task-base";

export class PubDriverTask extends PubTaskBase {

    public static fromProcedure(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER>,
    ): PubDriverTask {

        return new PubDriverTask(procedure);
    }

    private readonly _procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER>;

    protected constructor(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER>,
    ) {

        super(PUB_TASK_TYPE.DRIVER);

        this._procedure = procedure;
    }

    public get procedureIdentifier(): string {
        return this._procedure.identifier;
    }

    public serialize(): PubSerializedTask {

        return {
            procedureIdentifier: this.procedureIdentifier,
        };
    }
}
