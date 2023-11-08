/**
 * @author WMXPY
 * @namespace Workflow_Configuration
 * @description Compare Procedure
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "@sudopub/essential";

export const compareProcedureWithType = <T extends PUB_PROCEDURE_TYPE>(
    procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE>,
    type: T,
): procedure is PubProcedureConfiguration<T> => {

    return procedure.type === type;
};
