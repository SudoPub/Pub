/**
 * @author WMXPY
 * @namespace Task_Implementation
 * @description Map Finalize
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PUB_TASK_STATUS, PUB_TASK_TYPE, PubSerializedTask } from "../definition/task";
import { PubTaskBase } from "../task-base";

export class PubMapFinalizeTask extends PubTaskBase {

    public static fromProcedure(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>,
    ): PubMapFinalizeTask {

        return new PubMapFinalizeTask(procedure);
    }

    protected constructor(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>,
    ) {

        super(
            PUB_TASK_TYPE.MAP_FINALIZE,
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

    public serialize(): PubSerializedTask {

        return {
            procedureIdentifier: this.procedureIdentifier,
        };
    }
}
