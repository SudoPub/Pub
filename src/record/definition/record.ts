/**
 * @author WMXPY
 * @namespace Record_Definition
 * @description Record
 */

import { PubWorkflowConfiguration } from "../../workflow/definition/configuration";
import { PubRecordConnectionEnrichRecord } from "./connection-enrich";
import { PubRecordProcedureEnrichRecord } from "./procedure-enrich";
import { PubRecordRealizationRecord } from "./realization";

export type PubSerializedRecordSnapshot = {

    readonly procedureEnrich: PubRecordProcedureEnrichRecord;
    readonly connectionEnrich: PubRecordConnectionEnrichRecord;
    readonly realizationMap: PubRecordRealizationRecord;
};

export type PubSerializedRecord = {

    readonly configuration: PubWorkflowConfiguration;
    readonly snapshot: PubSerializedRecordSnapshot;
};
