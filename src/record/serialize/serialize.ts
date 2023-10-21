/**
 * @author WMXPY
 * @namespace Record_Serialize
 * @description Serialize
 */

import { PubSerializedRecord } from "../definition/record";
import { PubRecord } from "../record";

export const serializePubRecord = (record: PubRecord): PubSerializedRecord => {

    return record as any;
};

export const stringifyPubRecord = (record: PubRecord): string => {

    return JSON.stringify(
        serializePubRecord(record),
    );
};
