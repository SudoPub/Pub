/**
 * @author WMXPY
 * @namespace Task_Implementation
 * @description Finalize
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PubTaskBase } from "../task-base";

export class PubFinalizeTask extends PubTaskBase {

    public static fromProcedure(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.END>,
    ): PubFinalizeTask {

        return new PubFinalizeTask(procedure);
    }

    private readonly _procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.END>;

    protected constructor(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.END>,
    ) {

        super();

        this._procedure = procedure;
    }

    public get procedureIdentifier(): string {
        return this._procedure.identifier;
    }

    public serialize(): string {

        return JSON.stringify({
            taskIdentifier: this.taskIdentifier,
            procedureIdentifier: this.procedureIdentifier,
        });
    }
}
