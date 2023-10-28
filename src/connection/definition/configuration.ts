/**
 * @author WMXPY
 * @namespace Definition
 * @description Configuration
 */

export enum PUB_CONNECTION_WAYPOINT_TYPE {

    PROCEDURE_SELF_START = "PROCEDURE_SELF_START",
    PROCEDURE_SELF_END = "PROCEDURE_SELF_END",

    PROCEDURE_ITERATE_START = "PROCEDURE_ITERATE_START",
    PROCEDURE_ITERATE_END = "PROCEDURE_ITERATE_END",
}

export type PubConnectionConfiguration = {

    readonly identifier: string;

    readonly triggerProcedureIdentifier: string;
    readonly triggerProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE;

    readonly nextProcedureIdentifier: string;
    readonly nextProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE;

    readonly parametersMapping: Record<string, string>;
};
