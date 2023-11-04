/**
 * @author WMXPY
 * @namespace Example
 * @description Many To One
 * @override Example
 */

import { createStringPattern } from "@sudoo/pattern";
import { PubWorkflowConfiguration } from "../../src";
import { PUB_CONNECTION_WAYPOINT_TYPE } from "../../src/connection/definition/configuration";
import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../src/procedure/definition/configuration";

export const manyToOneExampleStartProcedure: PubProcedureConfiguration = {

    identifier: "START",
    type: PUB_PROCEDURE_TYPE.START,

    payload: {
        patterns: {
            hello: createStringPattern(),
        },
    },
};

export const manyToOneExampleEndProcedure: PubProcedureConfiguration = {

    identifier: "END",
    type: PUB_PROCEDURE_TYPE.END,

    payload: {
        patterns: {
            hello: createStringPattern(),
        },
    },
};

export const manyToOneExample: PubWorkflowConfiguration = {

    workflowName: "Many To One",
    workflowDescription: "Many To One Example for Test",

    procedures: [
        manyToOneExampleStartProcedure,
        {
            identifier: "FIRST",
            type: PUB_PROCEDURE_TYPE.DRIVER,

            payload: {
                driverName: "FIRST",

                parameterPatterns: {},
                outcomePatterns: {},
            },
        },
        {
            identifier: "SECOND",
            type: PUB_PROCEDURE_TYPE.DRIVER,

            payload: {
                driverName: "SECOND",

                parameterPatterns: {},
                outcomePatterns: {},
            },
        },
        {
            identifier: "THIRD",
            type: PUB_PROCEDURE_TYPE.DRIVER,

            payload: {
                driverName: "THIRD",

                parameterPatterns: {},
                outcomePatterns: {},
            },
        },
        manyToOneExampleEndProcedure,
    ],
    connections: [
        {
            identifier: "START-FIRST",

            triggerProcedureIdentifier: "START",
            triggerProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_END,

            nextProcedureIdentifier: "FIRST",
            nextProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_START,

            parametersMapping: {
            },
        },
        {
            identifier: "START-SECOND",

            triggerProcedureIdentifier: "START",
            triggerProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_END,

            nextProcedureIdentifier: "SECOND",
            nextProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_START,

            parametersMapping: {
            },
        },
        {
            identifier: "START-THIRD",

            triggerProcedureIdentifier: "START",
            triggerProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_END,

            nextProcedureIdentifier: "THIRD",
            nextProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_START,

            parametersMapping: {
            },
        },
        {
            identifier: "FIRST-END",

            triggerProcedureIdentifier: "FIRST",
            triggerProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_END,

            nextProcedureIdentifier: "END",
            nextProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_START,

            parametersMapping: {
            },
        },
        {
            identifier: "SECOND-END",

            triggerProcedureIdentifier: "SECOND",
            triggerProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_END,

            nextProcedureIdentifier: "END",
            nextProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_START,

            parametersMapping: {
            },
        },
        {
            identifier: "THIRD-END",

            triggerProcedureIdentifier: "THIRD",
            triggerProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_END,

            nextProcedureIdentifier: "END",
            nextProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_START,

            parametersMapping: {
            },
        },
    ],
};
