/**
 * @author WMXPY
 * @namespace Task_Implementation
 * @description Finalize
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PUB_TASK_STATUS, PUB_TASK_TYPE, PubSerializedTask } from "../definition/task";
import { PubTaskBase } from "../task-base";

export class PubFinalizeTask extends PubTaskBase {

    public static fromProcedure(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.END>,
    ): PubFinalizeTask {

        return new PubFinalizeTask(procedure);
    }

    protected constructor(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.END>,
    ) {

        super(
            PUB_TASK_TYPE.FINALIZE,
            PUB_TASK_STATUS.QUEUED,
            procedure,
        );
    }

    public get procedure(): PubProcedureConfiguration<PUB_PROCEDURE_TYPE.END> {
        return this._procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.END>;
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
