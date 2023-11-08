/**
 * @author WMXPY
 * @namespace Task_Factory
 * @description From Snapshot Task
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration, PubSnapshotTask } from "@sudopub/essential";
import { PubTaskFactoryInvalidProcedureTypeError } from "../../error/task/factory/invalid-procedure-type";
import { PubCachedWorkflowConfiguration } from "../../workflow/cache/configuration";
import { PubDriverTask } from "../implementation/driver";
import { PubFinalizeTask } from "../implementation/finalize";
import { PubMapEspialTask } from "../implementation/map-espial";
import { PubStartTask } from "../implementation/start";
import { PubTaskBase } from "../task-base";

export const createPubTaskFromSnapshotTask = (
    snapshotTask: PubSnapshotTask,
    configuration: PubCachedWorkflowConfiguration,
): PubTaskBase => {

    const procedure: PubProcedureConfiguration = configuration
        .getProcedureByIdentifier(snapshotTask.procedureIdentifier)
        .getOrThrow();

    if (procedure.type === PUB_PROCEDURE_TYPE.START) {

        return PubStartTask.fromSnapshotTask(
            snapshotTask,
            procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.START>,
        );
    } else if (procedure.type === PUB_PROCEDURE_TYPE.DRIVER) {

        return PubDriverTask.fromSnapshotTask(
            snapshotTask,
            procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER>,
        );
    } else if (procedure.type === PUB_PROCEDURE_TYPE.MAP) {

        return PubMapEspialTask.fromSnapshotTask(
            snapshotTask,
            procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>,
        );
    } else if (procedure.type === PUB_PROCEDURE_TYPE.END) {

        return PubFinalizeTask.fromSnapshotTask(
            snapshotTask,
            procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.END>,
        );
    }

    throw PubTaskFactoryInvalidProcedureTypeError.withProcedure(procedure);
};
