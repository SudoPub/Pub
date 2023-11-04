/**
 * @author WMXPY
 * @namespace Task_Factory
 * @description Create
 */

import { PubTaskFactoryInvalidProcedureTypeError } from "../../error/task/factory/invalid-procedure-type";
import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PubDriverTask } from "../implementation/driver";
import { PubFinalizeTask } from "../implementation/finalize";
import { PubMapTask } from "../implementation/map";
import { PubTaskBase } from "../task-base";

export const createPubTaskWithProcedure = (
    procedure: PubProcedureConfiguration,
    dependencies: string[],
): PubTaskBase => {

    if (procedure.type === PUB_PROCEDURE_TYPE.DRIVER) {

        return PubDriverTask.fromProcedure(
            procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER>,
            dependencies,
        );
    } else if (procedure.type === PUB_PROCEDURE_TYPE.MAP) {

        return PubMapTask.fromProcedure(
            procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>,
            dependencies,
        );
    } else if (procedure.type === PUB_PROCEDURE_TYPE.END) {

        return PubFinalizeTask.fromProcedure(
            procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.END>,
            dependencies,
        );
    }

    throw PubTaskFactoryInvalidProcedureTypeError.withProcedure(procedure);
};
