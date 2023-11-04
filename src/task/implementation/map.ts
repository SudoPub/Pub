/**
 * @author WMXPY
 * @namespace Task_Implementation
 * @description Map
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PUB_TASK_TYPE, PubSerializedTask } from "../definition/task";
import { PubTaskBase } from "../task-base";

export class PubMapTask extends PubTaskBase {

    public static fromProcedure(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>,
        dependencies: string[],
    ): PubMapTask {

        return new PubMapTask(procedure, dependencies);
    }

    private readonly _procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>;

    protected constructor(
        procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>,
        dependencies: string[],
    ) {

        super(PUB_TASK_TYPE.MAP, dependencies);

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
