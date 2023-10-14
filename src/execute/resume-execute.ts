/**
 * @author WMXPY
 * @namespace Execute
 * @description Resume Execute
 */

import { PUB_CONNECTION_TYPE, PubConnectionConfiguration } from "../connection/definition/configuration";
import { PUB_CONNECTION_PROCEDURE_REFERENCE_TYPE, PubConnectionProcedureReference } from "../connection/definition/procedure-reference";
import { PubExecuteConfigurationConnectionNotFoundError } from "../error/execute/configuration/connection-not-found";
import { PubExecuteConfigurationProcedureNotFoundError } from "../error/execute/configuration/procedure-not-found";
import { OrchestrationResourceManager } from "../orchestration/resource/manager";
import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../procedure/definition/configuration";
import { PubRecordProjection } from "../record/definition/projection";
import { PubRecord } from "../record/record";

export const resumeExecute = async (
    record: PubRecord,
    _resourceManager: OrchestrationResourceManager,
): Promise<PubRecord> => {

    const projections: PubRecordProjection[] = record.projections;

    for (const projection of projections) {

        const connections: Array<PubConnectionConfiguration<PUB_CONNECTION_TYPE>> =
            projection.triggerConnections
                .map((
                    connectionIdentifier: string,
                ) => {
                    const connection: PubConnectionConfiguration<PUB_CONNECTION_TYPE> | null =
                        record.cachedConfiguration.getConnectionByIdentifier(connectionIdentifier);

                    if (!connection) {
                        throw PubExecuteConfigurationConnectionNotFoundError.withIdentifier(
                            connectionIdentifier,
                        );
                    }

                    return connection;
                });

        const dependencyProcedures =
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

        console.log(connections, dependencyProcedures);
    }

    return record;
};
