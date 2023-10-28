/**
 * @author WMXPY
 * @namespace Record_Enrich
 * @description Find Procedure Waypoint
 */

import { PUB_CONNECTION_WAYPOINT_TYPE, PubConnectionConfiguration } from "../../connection/definition/configuration";
import { PubRecordEnrichProcedureTypeInvalidError } from "../../error/record/enrich/procedure-type-invalid";
import { PUB_PROCEDURE_TYPE } from "../../procedure/definition/configuration";
import { PubRecordProcedureEnrich } from "../definition/procedure-enrich";

export const findTriggerProcedureWaypoint = (
    connection: PubConnectionConfiguration,
    enrichProcedure: PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE>,
): string => {

    return findProcedureWaypoint(
        connection.triggerProcedureWaypointType,
        enrichProcedure,
    );
};

export const findNextProcedureWaypoint = (
    connection: PubConnectionConfiguration,
    enrichProcedure: PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE>,
): string => {

    return findProcedureWaypoint(
        connection.nextProcedureWaypointType,
        enrichProcedure,
    );
};

const findProcedureWaypoint = (
    procedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE,
    enrichProcedure: PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE>,
): string => {

    switch (procedureWaypointType) {

        case PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_START: {

            return enrichProcedure.enterWaypoint;
        }
        case PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_END: {

            const requiredTypes: PUB_PROCEDURE_TYPE[] = [
                PUB_PROCEDURE_TYPE.START,
                PUB_PROCEDURE_TYPE.DRIVER,
                PUB_PROCEDURE_TYPE.MAP,
            ];

            if (!requiredTypes.includes(enrichProcedure.procedureType)) {
                throw PubRecordEnrichProcedureTypeInvalidError.create(
                    procedureWaypointType,
                    requiredTypes,
                );
            }

            const fixedTypeEnrichProcedure: PubRecordProcedureEnrich<
                | PUB_PROCEDURE_TYPE.START
                | PUB_PROCEDURE_TYPE.DRIVER
                | PUB_PROCEDURE_TYPE.MAP> = enrichProcedure as any;

            return fixedTypeEnrichProcedure.exitWaypoint;
        }
        case PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_ITERATE_START: {

            const requiredTypes: PUB_PROCEDURE_TYPE[] = [
                PUB_PROCEDURE_TYPE.MAP,
            ];

            if (!requiredTypes.includes(enrichProcedure.procedureType)) {
                throw PubRecordEnrichProcedureTypeInvalidError.create(
                    procedureWaypointType,
                    requiredTypes,
                );
            }

            const fixedTypeEnrichProcedure: PubRecordProcedureEnrich<
                | PUB_PROCEDURE_TYPE.MAP
            > = enrichProcedure as any;

            return fixedTypeEnrichProcedure.iterationStartWaypoint;
        }
        case PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_ITERATE_END: {

            const requiredTypes: PUB_PROCEDURE_TYPE[] = [
                PUB_PROCEDURE_TYPE.MAP,
            ];

            if (!requiredTypes.includes(enrichProcedure.procedureType)) {
                throw PubRecordEnrichProcedureTypeInvalidError.create(
                    procedureWaypointType,
                    requiredTypes,
                );
            }

            const fixedTypeEnrichProcedure: PubRecordProcedureEnrich<
                | PUB_PROCEDURE_TYPE.MAP
            > = enrichProcedure as any;

            return fixedTypeEnrichProcedure.iterationEndWaypoint;
        }
    }
};
