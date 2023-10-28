/**
 * @author WMXPY
 * @namespace Util_Convert
 * @description Map To Record
 */

export const convertMapToRecord = <T extends string | number | symbol, V>(
    map: Map<T, V>,
): Record<T, V> => {

    const record: Partial<Record<T, V>> = {};

    for (const [key, value] of map) {

        if (value instanceof Map) {
            record[key] = convertMapToRecord(value);
            continue;
        }

        record[key] = value;
    }

    return record as Record<T, V>;
};
