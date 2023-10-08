/**
 * @author WMXPY
 * @namespace Record_Definition
 * @description Record
 */

import { PubWorkflowConfiguration } from "../../workflow/definition/configuration";
import { PUB_WORKFLOW_RECORD_TICK_TYPE, PubWorkflowRecordTick } from "./tick";

export type PubSerializedRecord = {

    readonly configuration: PubWorkflowConfiguration;

    readonly ticks: Array<PubWorkflowRecordTick<PUB_WORKFLOW_RECORD_TICK_TYPE>>;
};
