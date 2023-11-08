/**
 * @author WMXPY
 * @namespace Example
 * @description Two Action Map
 * @override Example
 */

import { createListPattern, createNumberPattern } from "@sudoo/pattern";
import { PUB_CONNECTION_WAYPOINT_TYPE, PUB_PROCEDURE_TYPE, PubProcedureConfiguration, PubProcedureConfiguration_Map, PubWorkflowConfiguration } from "@sudopub/essential";

export const twoActionMapStartProcedure: PubProcedureConfiguration = {

    identifier: "START",
    type: PUB_PROCEDURE_TYPE.START,

    payload: {
        patterns: {
            initial: createListPattern(createNumberPattern()),
        },
    },
};

export const twoActionMapEndProcedure: PubProcedureConfiguration = {

    identifier: "END",
    type: PUB_PROCEDURE_TYPE.END,

    payload: {
        patterns: {
            final: createListPattern(createNumberPattern()),
        },
    },
};

export const twoActionMapExample: PubWorkflowConfiguration = {

    workflowName: "Two Action Map",
    workflowDescription: "Two Action Map for testing",

    procedures: [
        twoActionMapStartProcedure,
        {
            identifier: "MAP",
            type: PUB_PROCEDURE_TYPE.MAP,

            payload: {
                iterationParameter: "iteration",
                iterationItemParameter: "item",

                iterationOutcome: "out",
                iterationItemOutcome: "result",

                parameterPatterns: {
                    iteration: createListPattern(createNumberPattern()),
                },
                outcomePatterns: {
                    out: createListPattern(createNumberPattern()),
                },
            } as PubProcedureConfiguration_Map,
        },
        {
            identifier: "TIMES",
            type: PUB_PROCEDURE_TYPE.DRIVER,

            payload: {
                driverName: "TIMES",

                parameterPatterns: {
                    value: createNumberPattern(),
                },
                outcomePatterns: {
                    value: createNumberPattern(),
                },
            },
        },
        {
            identifier: "PLUS",
            type: PUB_PROCEDURE_TYPE.DRIVER,

            payload: {
                driverName: "PLUS",

                parameterPatterns: {
                    value: createNumberPattern(),
                },
                outcomePatterns: {
                    value: createNumberPattern(),
                },
            },
        },
        twoActionMapEndProcedure,
    ],
    connections: [
        {
            identifier: "START-MAP",

            triggerProcedureIdentifier: "START",
            triggerProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_END,

            nextProcedureIdentifier: "MAP",
            nextProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_START,

            parametersMapping: {
                initial: "iteration",
            },
        },
        {
            identifier: "MAP-TIMES",

            triggerProcedureIdentifier: "MAP",
            triggerProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_ITERATE_START,

            nextProcedureIdentifier: "TIMES",
            nextProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_START,

            parametersMapping: {
                item: "value",
            },
        },
        {
            identifier: "TIMES-PLUS",

            triggerProcedureIdentifier: "TIMES",
            triggerProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_END,

            nextProcedureIdentifier: "PLUS",
            nextProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_START,

            parametersMapping: {
                value: "value",
            },
        },
        {
            identifier: "PLUS-MAP",

            triggerProcedureIdentifier: "PLUS",
            triggerProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_END,

            nextProcedureIdentifier: "MAP",
            nextProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_ITERATE_END,

            parametersMapping: {
                value: "result",
            },
        },
        {
            identifier: "MAP-END",

            triggerProcedureIdentifier: "MAP",
            triggerProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_END,

            nextProcedureIdentifier: "END",
            nextProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_START,

            parametersMapping: {
                out: "final",
            },
        },
    ],
};
