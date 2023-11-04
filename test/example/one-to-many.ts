/**
 * @author WMXPY
 * @namespace Example
 * @description One To Many
 * @override Example
 */

import { createStringPattern } from "@sudoo/pattern";
import { PubWorkflowConfiguration } from "../../src";
import { PUB_CONNECTION_WAYPOINT_TYPE } from "../../src/connection/definition/configuration";
import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../src/procedure/definition/configuration";

export const oneToManyExampleStartProcedure: PubProcedureConfiguration = {

    identifier: "START",
    type: PUB_PROCEDURE_TYPE.START,

    payload: {
        patterns: {
            hello: createStringPattern(),
        },
    },
};

export const oneToManyExampleEndProcedure: PubProcedureConfiguration = {

    identifier: "END",
    type: PUB_PROCEDURE_TYPE.END,

    payload: {
        patterns: {
            hello: createStringPattern(),
        },
    },
};

export const oneToManyExample: PubWorkflowConfiguration = {

    workflowName: "One To Many",
    workflowDescription: "One To Many Example for Test",

    procedures: [
        oneToManyExampleStartProcedure,
        {
            identifier: "INIT",
            type: PUB_PROCEDURE_TYPE.DRIVER,

            payload: {
                driverName: "INIT",

                parameterPatterns: {},
                outcomePatterns: {},
            },
        },
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
        oneToManyExampleEndProcedure,
    ],
    connections: [
        {
            identifier: "START-INIT",

            triggerProcedureIdentifier: "START",
            triggerProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_END,

            nextProcedureIdentifier: "INIT",
            nextProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_START,

            parametersMapping: {
            },
        },
        {
            identifier: "INIT-FIRST",

            triggerProcedureIdentifier: "INIT",
            triggerProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_END,

            nextProcedureIdentifier: "FIRST",
            nextProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_START,

            parametersMapping: {
            },
        },
        {
            identifier: "INIT-SECOND",

            triggerProcedureIdentifier: "INIT",
            triggerProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_END,

            nextProcedureIdentifier: "SECOND",
            nextProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_START,

            parametersMapping: {
            },
        },
        {
            identifier: "INIT-THIRD",

            triggerProcedureIdentifier: "INIT",
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
        }
    ],
};
