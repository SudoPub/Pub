/**
 * @author WMXPY
 * @namespace Example
 * @description Just Run
 * @override Example
 */

import { createStringPattern } from "@sudoo/pattern";
import { PUB_CONNECTION_WAYPOINT_TYPE, PUB_PROCEDURE_TYPE, PubProcedureConfiguration, PubWorkflowConfiguration } from "@sudopub/essential";

export const justRunExampleStartProcedure: PubProcedureConfiguration = {

    identifier: "START",
    type: PUB_PROCEDURE_TYPE.START,

    payload: {
        patterns: {
            hello: createStringPattern(),
        },
    },
};

export const justRunExampleEndProcedure: PubProcedureConfiguration = {

    identifier: "END",
    type: PUB_PROCEDURE_TYPE.END,

    payload: {
        patterns: {
            hello: createStringPattern(),
        },
    },
};

export const justRunExample: PubWorkflowConfiguration = {

    workflowName: "Just Run",
    workflowDescription: "Just Run Example for Test",

    procedures: [
        justRunExampleStartProcedure,
        {
            identifier: "JUST_RUN",
            type: PUB_PROCEDURE_TYPE.DRIVER,

            payload: {
                driverName: "JUST_RUN",

                parameterPatterns: {
                    world: createStringPattern(),
                },
                outcomePatterns: {},
            },
        },
        justRunExampleEndProcedure,
    ],
    connections: [
        {
            identifier: "START-JUST_RUN",

            triggerProcedureIdentifier: "START",
            triggerProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_END,

            nextProcedureIdentifier: "JUST_RUN",
            nextProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_START,

            parametersMapping: {
                hello: "world",
            },
        },
        {
            identifier: "JUST_RUN-END",

            triggerProcedureIdentifier: "JUST_RUN",
            triggerProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_END,

            nextProcedureIdentifier: "END",
            nextProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_START,

            parametersMapping: {
            },
        },
    ],
};
