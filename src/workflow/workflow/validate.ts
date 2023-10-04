/**
 * @author WMXPY
 * @namespace Workflow
 * @description Validate
 */

import { PubWorkflowConfiguration } from "../definition/configuration";

export const validateWorkflowConfiguration = (configuration: PubWorkflowConfiguration): boolean => {

    if (!configuration) {
        return false;
    }

    return true;
};
