/**
 * @author WMXPY
 * @namespace Orchestration_Procedure
 * @description Find Dependencies
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PubRecord } from "../../record/record";

export const findProcedureDependencies = (
    _record: PubRecord,
    _procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE>,
): Array<PubProcedureConfiguration<PUB_PROCEDURE_TYPE>> => {

    return [];
};
