/**
 * @author WMXPY
 * @namespace Task_Implementation
 * @description Map Finalize
 */

import { PUB_PROCEDURE_TYPE, PUB_TASK_STATUS, PUB_TASK_TYPE, PubProcedureConfiguration, PubSerializedTask, PubSnapshotTask } from "@sudopub/essential";
import { PubTaskBase } from "../task-base";

export class PubMapFinalizeTask extends PubTaskBase {

    public static fromProcedure(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>,
    ): PubMapFinalizeTask {

        return new PubMapFinalizeTask(procedure, PUB_TASK_STATUS.AWAIT_DEPENDENCY);
    }

    public static fromSnapshotTask(
        snapshotTask: PubSnapshotTask,
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>,
    ): PubMapFinalizeTask {

        return new PubMapFinalizeTask(procedure, snapshotTask.status)
            .deserialize(snapshotTask);
    }

    protected constructor(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>,
        initialStatus: PUB_TASK_STATUS,
    ) {

        super(
            PUB_TASK_TYPE.MAP_FINALIZE,
            initialStatus,
            procedure,
        );
    }

    public get procedure(): PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP> {
        return this._procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>;
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
