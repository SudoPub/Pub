/**
 * @author WMXPY
 * @namespace Task_Implementation
 * @description Driver
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PUB_TASK_STATUS, PUB_TASK_TYPE, PubSerializedTask } from "../definition/task";
import { PubTaskBase } from "../task-base";

export class PubDriverTask extends PubTaskBase {

    public static fromProcedure(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER>,
    ): PubDriverTask {

        return new PubDriverTask(procedure);
    }

    protected constructor(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER>,
    ) {

        super(
            PUB_TASK_TYPE.DRIVER,
            PUB_TASK_STATUS.QUEUED,
            procedure,
        );
    }

    public get procedure(): PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER> {
        return this._procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER>;
    }

    public get procedureIdentifier(): string {
        return this._procedure.identifier;
    }

    public serialize(): PubSerializedTask {

        return {
            procedureIdentifier: this.procedureIdentifier,
        };
    }

    public deserialize(_serialized: PubSerializedTask): this {
        return this;
    }
}
