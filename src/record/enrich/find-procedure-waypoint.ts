/**
 * @author WMXPY
 * @namespace Record_Enrich
 * @description Find Procedure Waypoint
 */

export const findNextProcedureWaypoint = (
    connection: PubConnectionConfiguration,
    enrichProcedure: PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE>,
): string => {

    if (connection.nextProcedureWaypointType === CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_START) {
        return enrichProcedure.enterWaypoint;
    }

    if (connection.nextProcedureWaypointType === CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_END) {
        if (enr)

            return enrichProcedure.exitWaypoint;
    }
};
