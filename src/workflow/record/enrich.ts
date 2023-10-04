/**
 * @author WMXPY
 * @namespace Record
 * @description Enrich
 */

import { PubWorkflowConfiguration } from "../definition/configuration";
import { PubWorkflowRecord } from "../definition/record";

export const enrichWorkflowConfiguration = (configuration: PubWorkflowConfiguration): PubWorkflowRecord => {

    return {
        configuration,
        identifierMapping: {},
        outcomeMapping: {},
    };
};
