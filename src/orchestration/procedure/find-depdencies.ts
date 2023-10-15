/**
 * @author WMXPY
 * @namespace Orchestration_Procedure
 * @description Find Dependencies
 */

import { PUB_CONNECTION_TYPE, PubConnectionConfiguration } from "../../connection/definition/configuration";
import { PUB_CONNECTION_PROCEDURE_REFERENCE_TYPE, PubConnectionProcedureReference } from "../../connection/definition/procedure-reference";
import { PubExecuteConfigurationProcedureNotFoundError } from "../../error/execute/configuration/procedure-not-found";
import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PubRecord } from "../../record/record";

export const findProcedureDependencies = (
    record: PubRecord,
    procedure: PubConnectionConfiguration<PUB_CONNECTION_TYPE>,
): Array<PubProcedureConfiguration<PUB_PROCEDURE_TYPE>> => {

    const dependencyProcedures: Array<PubProcedureConfiguration<PUB_PROCEDURE_TYPE>> =
        record.cachedConfiguration.configuration.connections
            .filter((connection: PubConnectionConfiguration<PUB_CONNECTION_TYPE>) => {
                return connection.type === PUB_CONNECTION_TYPE.DIRECT;
            })
            .filter((connection: PubConnectionConfiguration<PUB_CONNECTION_TYPE>) => {
                return connection.nextProcedure.type === PUB_CONNECTION_PROCEDURE_REFERENCE_TYPE.PROCEDURE;
            })
            .map((connection: PubConnectionConfiguration<PUB_CONNECTION_TYPE>) => {

                const nextProcedure: PubConnectionProcedureReference<
                    PUB_CONNECTION_PROCEDURE_REFERENCE_TYPE.PROCEDURE
                > = connection.nextProcedure as PubConnectionProcedureReference<
                    PUB_CONNECTION_PROCEDURE_REFERENCE_TYPE.PROCEDURE
                >;

                return nextProcedure.payload.procedureIdentifier;
            })
            .filter((nextProcedureIdentifier: string) => {
                return nextProcedureIdentifier === procedure.identifier;
            })
            .map((nextProcedureIdentifier: string) => {

                const dependencyProcedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE> | null =
                    record.cachedConfiguration.getProcedureByIdentifier(
                        nextProcedureIdentifier,
                    );

                if (dependencyProcedure === null) {
                    throw PubExecuteConfigurationProcedureNotFoundError.withIdentifier(
                        nextProcedureIdentifier,
                    );
                }
                return dependencyProcedure;
            });

    return dependencyProcedures;
};
