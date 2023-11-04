/**
 * @author WMXPY
 * @namespace Task_Implementation
 * @description Driver
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { IPubTask } from "../definition/task";
import { PubTaskBase } from "../task-base";

export class PubDriverTask extends PubTaskBase implements IPubTask {

    public static fromProcedure(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER>,
    ): PubDriverTask {

        return new PubDriverTask(procedure);
    }

    private readonly _procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER>;

    protected constructor(procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER>) {

        super();

        this._procedure = procedure;
    }

    public get procedureIdentifier(): string {
        return this._procedure.identifier;
    }
}
