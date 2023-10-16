/**
 * @author WMXPY
 * @namespace Execute
 * @description Plan Next Step
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../procedure/definition/configuration";
import { PubRecordProcedureEnrich } from "../record/definition/procedure-enrich";
import { PubRecordSnapshot } from "../record/snapshot/snapshot";
import { PubCachedWorkflowConfiguration } from "../workflow/cache/configuration";

export type ExecutePlanNextStepResult = {

    // readonly nextStep: ExecuteStep;
};

export const executePlanNextStep = (
    cachedConfiguration: PubCachedWorkflowConfiguration,
    snapshot: PubRecordSnapshot,
): ExecutePlanNextStepResult => {

    const procedureDependencyWaypoints: string[] = cachedConfiguration.configuration.procedures
        .map(<T extends PUB_PROCEDURE_TYPE>(procedure: PubProcedureConfiguration<T>) => {

            const enrich: PubRecordProcedureEnrich<T> = snapshot.procedureEnrichMap.get(procedure.identifier) as PubRecordProcedureEnrich<T>;

            return enrich.enterWaypoint;
        });

    console.log(procedureDependencyWaypoints);

    return {};
};
