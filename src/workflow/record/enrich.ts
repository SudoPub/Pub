/**
 * @author WMXPY
 * @namespace Workflow_Record
 * @description Enrich
 */

import { UUIDVersion1 } from "@sudoo/uuid";
import { PubWorkflowConfiguration } from "../definition/configuration";
import { PubWorkflowRecord } from "../definition/record";
import { PUB_WORKFLOW_RECORD_MAPPING_TYPE, PubWorkflowRecordMappingElement } from "../definition/record-mapping";

export const enrichWorkflowConfiguration = (configuration: PubWorkflowConfiguration): PubWorkflowRecord => {

    const identifierMapping: Record<string, PubWorkflowRecordMappingElement> = {};

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const espial of configuration.espials) {

        const uuid: string = UUIDVersion1.generateString();

        identifierMapping[uuid] = {
            identifier: uuid,
            type: PUB_WORKFLOW_RECORD_MAPPING_TYPE.ESPIAL,
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const procedure of configuration.procedures) {

        const uuid: string = UUIDVersion1.generateString();

        identifierMapping[uuid] = {
            identifier: uuid,
            type: PUB_WORKFLOW_RECORD_MAPPING_TYPE.PROCEDURE,
        };
    }

    return {

        configuration,
        identifierMapping,
        outcomeMapping: {},
    };
};
