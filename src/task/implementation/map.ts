/**
 * @author WMXPY
 * @namespace Task_Implementation
 * @description Map
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PubTaskBase } from "../task-base";

export class PubMapTask extends PubTaskBase {

    public static fromProcedure(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>,
    ): PubMapTask {

        return new PubMapTask(procedure);
    }

    private readonly _procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>;

    protected constructor(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>,
    ) {

        super();

        this._procedure = procedure;
    }

    public get procedureIdentifier(): string {
        return this._procedure.identifier;
    }
}
