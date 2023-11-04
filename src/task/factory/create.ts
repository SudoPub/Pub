/**
 * @author WMXPY
 * @namespace Task_Factory
 * @description Create
 */

import { PubTaskFactoryInvalidProcedureTypeError } from "../../error/task/factory/invalid-procedure-type";
import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PubDriverTask } from "../implementation/driver";
import { PubMapTask } from "../implementation/map";
import { PubTaskBase } from "../task-base";

export const createPubTaskWithProcedure = (
    procedure: PubProcedureConfiguration,
): PubTaskBase => {

    if (procedure.type === PUB_PROCEDURE_TYPE.DRIVER) {

        return PubDriverTask.fromProcedure(
            procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER>,
        );
    } else if (procedure.type === PUB_PROCEDURE_TYPE.MAP) {

        return PubMapTask.fromProcedure(
            procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>,
        );
    }


    throw PubTaskFactoryInvalidProcedureTypeError.withProcedure(procedure);
};
