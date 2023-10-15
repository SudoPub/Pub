/**
 * @author WMXPY
 * @namespace Orchestration_Connection
 * @description Find Dependencies
 */

import { PUB_CONNECTION_TYPE, PubConnectionConfiguration } from "../../connection/definition/configuration";
import { PUB_CONNECTION_PROCEDURE_REFERENCE_TYPE, PubConnectionProcedureReference } from "../../connection/definition/procedure-reference";
import { PubExecuteConfigurationProcedureNotFoundError } from "../../error/execute/configuration/procedure-not-found";
import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PubRecord } from "../../record/record";

export const findConnectionDependencies = (
    record: PubRecord,
    connection: PubConnectionConfiguration<PUB_CONNECTION_TYPE>,
): Array<PubProcedureConfiguration<PUB_PROCEDURE_TYPE>> => {


    const dependencyProcedures: Array<PubProcedureConfiguration<PUB_PROCEDURE_TYPE>> =
        connections
            .filter((connection: PubConnectionConfiguration<PUB_CONNECTION_TYPE>) =>
                connection.nextProcedure.type === PUB_CONNECTION_PROCEDURE_REFERENCE_TYPE.PROCEDURE,
            )
            .map((connection: PubConnectionConfiguration<PUB_CONNECTION_TYPE>) => {

                const nextProcedure: PubConnectionProcedureReference<
                    PUB_CONNECTION_PROCEDURE_REFERENCE_TYPE.PROCEDURE
                > = connection.nextProcedure as PubConnectionProcedureReference<
                    PUB_CONNECTION_PROCEDURE_REFERENCE_TYPE.PROCEDURE
                >;

                const procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE> | null =
                    record.cachedConfiguration.getProcedureByIdentifier(
                        nextProcedure.payload.procedureIdentifier,
                    );

                if (!procedure) {
                    throw PubExecuteConfigurationProcedureNotFoundError.withIdentifier(
                        nextProcedure.payload.procedureIdentifier,
                    );
                }

                return procedure;
            });

    return dependencyProcedures;
};
