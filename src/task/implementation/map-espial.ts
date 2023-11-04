/**
 * @author WMXPY
 * @namespace Task_Implementation
 * @description Map Espial
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PUB_TASK_TYPE, PubSerializedTask } from "../definition/task";
import { PubTaskBase } from "../task-base";

export class PubMapEspialTask extends PubTaskBase {

    public static fromProcedure(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>,
        dependencies: string[],
    ): PubMapEspialTask {

        return new PubMapEspialTask(procedure, dependencies);
    }

    private readonly _procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>;

    protected constructor(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>,
        dependencies: string[],
    ) {

        super(PUB_TASK_TYPE.MAP_ESPIAL, dependencies);

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