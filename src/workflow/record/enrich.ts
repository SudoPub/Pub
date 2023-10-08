/**
 * @author WMXPY
 * @namespace Workflow_Record
 * @description Enrich
 */

import { PubRecord } from "../../record/definition/record";
import { PubWorkflowConfiguration } from "../definition/configuration";

export const enrichWorkflowConfiguration = (
    configuration: PubWorkflowConfiguration,
): PubRecord => {

    return {

        configuration,

        ticks: [],
    };
};
