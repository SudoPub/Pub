/**
 * @author WMXPY
 * @namespace Record_Serialize
 * @description Deserialize
 */

import { PubSerializedRecord } from "../definition/record";
import { PubRecord } from "../record";

export const deserializePubRecord = (serialized: PubSerializedRecord): PubRecord => {

    return serialized as any;
};

export const parsePubRecord = (rawRecord: string): PubRecord => {

    return deserializePubRecord(
        JSON.parse(rawRecord),
    );
};
