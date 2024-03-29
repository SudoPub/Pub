/**
 * @author WMXPY
 * @namespace Task_Factory
 * @description Create
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "@sudopub/essential";
import { PubTaskFactoryInvalidProcedureTypeError } from "../../error/task/factory/invalid-procedure-type";
import { PubDriverTask } from "../implementation/driver";
import { PubFinalizeTask } from "../implementation/finalize";
import { PubMapEspialTask } from "../implementation/map-espial";
import { PubStartTask } from "../implementation/start";
import { PubTaskBase } from "../task-base";

export const createPubTaskWithProcedure = (
    procedure: PubProcedureConfiguration,
): PubTaskBase => {

    if (procedure.type === PUB_PROCEDURE_TYPE.START) {

        return PubStartTask.fromProcedure(
            procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.START>,
        );
    } else if (procedure.type === PUB_PROCEDURE_TYPE.DRIVER) {

        return PubDriverTask.fromProcedure(
            procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER>,
        );
    } else if (procedure.type === PUB_PROCEDURE_TYPE.MAP) {

        return PubMapEspialTask.fromProcedure(
            procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>,
        );
    } else if (procedure.type === PUB_PROCEDURE_TYPE.END) {

        return PubFinalizeTask.fromProcedure(
            procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.END>,
        );
    }

    throw PubTaskFactoryInvalidProcedureTypeError.withProcedure(procedure);
};
