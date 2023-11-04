/**
 * @author WMXPY
 * @namespace Task_Implementation
 * @description Finalize
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PUB_TASK_TYPE, PubSerializedTask } from "../definition/task";
import { PubTaskBase } from "../task-base";

export class PubFinalizeTask extends PubTaskBase {

    public static fromProcedure(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.END>,
        dependencies: string[],
    ): PubFinalizeTask {

        return new PubFinalizeTask(procedure, dependencies);
    }

    private readonly _procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.END>;

    protected constructor(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.END>,
        dependencies: string[],
    ) {

        super(PUB_TASK_TYPE.FINALIZE, dependencies);

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
