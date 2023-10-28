/**
 * @author WMXPY
 * @namespace Util_Convert
 * @description Record To Map
 */

export const convertRecordToMap = <T extends string | number | symbol, V>(
    record: Record<T, V>,
): Map<T, V> => {

    const map: Map<T, V> = new Map();

    for (const key of Object.keys(record)) {

        const value: V = record[key as T];
        map.set(key as T, value);
    }

    return map;
};
