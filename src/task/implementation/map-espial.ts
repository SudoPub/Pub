/**
 * @author WMXPY
 * @namespace Task_Implementation
 * @description Map Espial
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PubSnapshotTask } from "../../snapshot/task";
import { PUB_TASK_STATUS, PUB_TASK_TYPE, PubSerializedTask } from "../definition/task";
import { PubTaskBase } from "../task-base";
import { PubMapFinalizeTask } from "./map-finalize";

export class PubMapEspialTask extends PubTaskBase {

    public static fromProcedure(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>,
    ): PubMapEspialTask {

        return new PubMapEspialTask(procedure, PUB_TASK_STATUS.AWAIT_DEPENDENCY);
    }

    public static fromSnapshotTask(
        snapshotTask: PubSnapshotTask,
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>,
    ): PubMapEspialTask {

        return new PubMapEspialTask(procedure, snapshotTask.status)
            .deserialize(snapshotTask);
    }

    protected constructor(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>,
        initialStatus: PUB_TASK_STATUS,
    ) {

        super(
            PUB_TASK_TYPE.MAP_ESPIAL,
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

    public convertToFinalize(): PubMapFinalizeTask {

        return PubMapFinalizeTask.fromProcedure(this.procedure);
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
