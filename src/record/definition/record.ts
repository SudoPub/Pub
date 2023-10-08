/**
 * @author WMXPY
 * @namespace Record_Definition
 * @description Record
 */

import { PubWorkflowConfiguration } from "../../workflow/definition/configuration";
import { PubWorkflowRecordTick } from "./tick";

export type PubSerializedRecord = {

    readonly configuration: PubWorkflowConfiguration;

    readonly ticks: PubWorkflowRecordTick[];
};
