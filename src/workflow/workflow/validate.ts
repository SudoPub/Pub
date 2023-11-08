/**
 * @author WMXPY
 * @namespace Workflow_Workflow
 * @description Validate
 */

import { PubWorkflowConfiguration } from "@sudopub/essential";

export const validateWorkflowConfiguration = (configuration: PubWorkflowConfiguration): boolean => {

    if (!configuration) {
        return false;
    }

    return true;
};
