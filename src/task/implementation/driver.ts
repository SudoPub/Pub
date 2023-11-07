/**
 * @author WMXPY
 * @namespace Task_Implementation
 * @description Driver
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PubSnapshotTask } from "../../snapshot/task";
import { PUB_TASK_STATUS, PUB_TASK_TYPE, PubSerializedTask } from "../definition/task";
import { PubTaskBase } from "../task-base";

export class PubDriverTask extends PubTaskBase {

    public static fromProcedure(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER>,
    ): PubDriverTask {

        return new PubDriverTask(procedure, PUB_TASK_STATUS.QUEUED);
    }

    public static fromSnapshotTask(
        snapshotTask: PubSnapshotTask,
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER>,
    ): PubDriverTask {

        return new PubDriverTask(procedure, snapshotTask.status)
            .deserialize(snapshotTask);
    }

    protected constructor(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER>,
        initialStatus: PUB_TASK_STATUS,
    ) {

        super(
            PUB_TASK_TYPE.DRIVER,
            initialStatus,
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
