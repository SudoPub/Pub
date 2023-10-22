/**
 * @author WMXPY
 * @namespace Execute_Plan
 * @description Available Procedure
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PubRecord } from "../../record/record";

export const findAvailableProcedureFromRecord = (
    _record: PubRecord,
): Array<PubProcedureConfiguration<PUB_PROCEDURE_TYPE>> => {

    return [];
};
