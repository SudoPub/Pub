/**
 * @author WMXPY
 * @namespace Record_Realization
 * @description Hash
 */

export const encodeHashRealizedProcedure = (
    procedureIdentifier: string,
    iteration?: number,
): string => {

    if (typeof iteration === 'number') {
        return `I-${iteration}::${procedureIdentifier}`;
    }
    return `I-ROOT::${procedureIdentifier}`;
};

export type DecodeRealizedProcedureHash = {

    readonly procedureIdentifier: string;
    readonly iteration?: number;
};

export const decodeHashRealizedProcedure = (
    hash: string,
): DecodeRealizedProcedureHash => {

    const firstMarker: number = hash.indexOf('::');

    if (firstMarker === -1) {
        return {
            procedureIdentifier: hash,
        };
    }

    const keyPart: string = hash.substring(0, firstMarker);
    const valuePart: string = hash.substring(firstMarker + 2);

    const keyActions: string[] = keyPart.split(';');

    let iteration: number | undefined;

    for (const keyAction of keyActions) {

        const keyActionSplit: string[] = keyAction.split('-');
        const key: string = keyActionSplit[0];
        const value: string = keyActionSplit[1];

        if (key === 'I') {
            if (value !== 'ROOT') {
                iteration = Number(value);
            }
        }
    }

    return {
        procedureIdentifier: valuePart,
        iteration,
    };
};
