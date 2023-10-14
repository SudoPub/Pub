/**
 * @author WMXPY
 * @namespace Execute
 * @description Resume Execute
 */

import { PUB_CONNECTION_TYPE, PubConnectionConfiguration } from "../connection/definition/configuration";
import { PubExecuteConfigurationConnectionNotFoundError } from "../error/execute/configuration/connection-not-found";
import { OrchestrationResourceManager } from "../orchestration/resource/manager";
import { PubRecordProjection } from "../record/definition/projection";
import { PubRecord } from "../record/record";

export const resumeExecute = async (
    record: PubRecord,
    _resourceManager: OrchestrationResourceManager,
): Promise<PubRecord> => {

    const projections: PubRecordProjection[] = record.projections;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const projection of projections) {

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const dependencyProcedures = [];

        const connections: Array<PubConnectionConfiguration<PUB_CONNECTION_TYPE>> =
            projection.triggerConnections.map((
                connectionIdentifier: string,
            ) => {
                const connection: PubConnectionConfiguration<PUB_CONNECTION_TYPE> | null =
                    record.cachedConfiguration.getConnectionByIdentifier(connectionIdentifier);

                if (!connection) {
                    throw PubExecuteConfigurationConnectionNotFoundError.create(connectionIdentifier);
                }

                return connection;
            });

        console.log(connections);
    }

    return record;
};
