/**
 * @author WMXPY
 * @namespace Execute
 * @description Resume Execute
 */

import { PubConnectionConfiguration } from "../connection/definition/configuration";
import { PubExecuteConfigurationConnectionNotFoundError } from "../error/execute/configuration/connection-not-found";
import { OrchestrationResourceManager } from "../orchestration/resource/manager";
import { PubRecordProjection } from "../record/definition/projection";
import { PubRecord } from "../record/record";

export const resumeExecute = async (
    record: PubRecord,
    _resourceManager: OrchestrationResourceManager,
): Promise<PubRecord> => {

    const projections: PubRecordProjection[] = record.projections;

    for (const projection of projections) {

        const connections: PubConnectionConfiguration[] =
            projection.triggerConnections
                .map((
                    connectionIdentifier: string,
                ) => {
                    const connection: PubConnectionConfiguration | null =
                        record.cachedConfiguration.getConnectionByIdentifier(connectionIdentifier);

                    if (!connection) {
                        throw PubExecuteConfigurationConnectionNotFoundError.withIdentifier(
                            connectionIdentifier,
                        );
                    }

                    return connection;
                });

        // const dependencyProcedures: Array<PubProcedureConfiguration<PUB_PROCEDURE_TYPE>> =
        //     connections
        //         .filter((connection: PubConnectionConfiguration) =>
        //             connection.nextProcedure.type === PUB_CONNECTION_PROCEDURE_REFERENCE_TYPE.PROCEDURE,
        //         )
        //         .map((connection: PubConnectionConfiguration) => {

        //             const nextProcedure: PubConnectionProcedureReference<
        //                 PUB_CONNECTION_PROCEDURE_REFERENCE_TYPE.PROCEDURE
        //             > = connection.nextProcedure as PubConnectionProcedureReference<
        //                 PUB_CONNECTION_PROCEDURE_REFERENCE_TYPE.PROCEDURE
        //             >;

        //             const procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE> | null =
        //                 record.cachedConfiguration.getProcedureByIdentifier(
        //                     nextProcedure.payload.procedureIdentifier,
        //                 );

        //             if (!procedure) {
        //                 throw PubExecuteConfigurationProcedureNotFoundError.withIdentifier(
        //                     nextProcedure.payload.procedureIdentifier,
        //                 );
        //             }

        //             return procedure;
        //         });

        console.log(connections);
    }

    return record;
};
