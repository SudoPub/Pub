/**
 * @author WMXPY
 * @namespace Example
 * @description Just Run
 * @override Example
 */

import { PubWorkflowConfiguration } from "../../src";
import { PUB_PROCEDURE_TYPE } from "../../src/procedure/definition/configuration";

export const justRunExample: PubWorkflowConfiguration = {

    workflowName: "Just Run",
    workflowDescription: "Just Run",

    startParametersPattern: {},
    procedures: [
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
    connections: [],
};
