/**
 * @author WMXPY
 * @namespace Util
 * @description Map To Record
 */

export const convertMapToRecord = <T extends string | number | symbol, V>(
    map: Map<T, V>,
): Record<T, V> => {

    const record: Partial<Record<T, V>> = {};

    for (const [key, value] of map) {
        record[key] = value;
    }

    return record as Record<T, V>;
};
