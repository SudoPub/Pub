/**
 * @author WMXPY
 * @namespace Assert
 * @description Type
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../definition/configuration";

export const assertProcedureIsDriver = (procedure: PubProcedureConfiguration):
    asserts procedure is PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER> => {

    if (procedure.type !== PUB_PROCEDURE_TYPE.DRIVER) {
        throw new Error('[Sudoo-Pub] Procedure is not driver');
    }
};
