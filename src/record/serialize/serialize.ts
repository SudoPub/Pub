/**
 * @author WMXPY
 * @namespace Record_Serialize
 * @description Serialize
 */

import { PubSerializedRecord, PubSerializedRecordSnapshot } from "../definition/record";
import { PubRecord } from "../record";

export const serializePubRecord = (record: PubRecord): PubSerializedRecord => {

    const snapshot: PubSerializedRecordSnapshot = {

        procedureEnrich: record.procedureEnrich,
        connectionEnrich: record.connectionEnrich,
        realizationMap: record.realizationMap,
    };


    return record as any;
};

export const stringifyPubRecord = (record: PubRecord): string => {

    return JSON.stringify(
        serializePubRecord(record),
    );
};
