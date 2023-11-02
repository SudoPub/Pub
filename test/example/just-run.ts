/**
 * @author WMXPY
 * @namespace Example
 * @description Just Run
 * @override Example
 */

import { createStringPattern } from "@sudoo/pattern";
import { PubWorkflowConfiguration } from "../../src";
import { PUB_CONNECTION_WAYPOINT_TYPE } from "../../src/connection/definition/configuration";
import { PUB_PROCEDURE_TYPE } from "../../src/procedure/definition/configuration";

export const justRunExample: PubWorkflowConfiguration = {

    workflowName: "Just Run",
    workflowDescription: "Just Run",

    startParametersPattern: {},
    procedures: [
        {
            identifier: "START",
            type: PUB_PROCEDURE_TYPE.START,

            payload: {
                patterns: {
                    hello: createStringPattern(),
                },
            },
        },
        {
            identifier: "JUST_RUN",
            type: PUB_PROCEDURE_TYPE.DRIVER,

            payload: {
                driverName: "JUST_RUN",

                parameterPatterns: {},
                outcomePatterns: {},
            },
        },
    ],
    connections: [
        {
            identifier: "START-JUST_RUN",

            triggerProcedureIdentifier: "START",
            triggerProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_END,

            nextProcedureIdentifier: "JUST_RUN",
            nextProcedureWaypointType: PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_START,

            parametersMapping: {
            },
        },
    ],
};
