/**
 * @author WMXPY
 * @namespace Task_Implementation
 * @description Map Espial
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PUB_TASK_STATUS, PUB_TASK_TYPE, PubSerializedTask } from "../definition/task";
import { PubTaskBase } from "../task-base";
import { PubMapFinalizeTask } from "./map-finalize";

export class PubMapEspialTask extends PubTaskBase {

    public static fromProcedure(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>,
    ): PubMapEspialTask {

        return new PubMapEspialTask(procedure);
    }

    protected constructor(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>,
    ) {

        super(
            PUB_TASK_TYPE.MAP_ESPIAL,
            PUB_TASK_STATUS.AWAIT_DEPENDENCY,
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
