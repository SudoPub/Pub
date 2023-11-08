/**
 * @author WMXPY
 * @namespace Task_Mapping
 * @description Validate Pattern
 */

import { Pattern } from "@sudoo/pattern";
import { Verifier, VerifyResult } from "@sudoo/verify";
import { PubProcedurePattern, TaskExecuteInput, TaskExecuteOutput } from "@sudopub/essential";

export const validatePartialProcedurePattern = (
    pattern: PubProcedurePattern,
    input: TaskExecuteInput | TaskExecuteOutput,
): boolean => {

    eachPattern: for (const key of Object.keys(pattern)) {

        const value: Pattern = pattern[key];
        const inputValue: any = input[key];

        if (typeof inputValue === 'undefined') {
            continue eachPattern;
        }

        const verifier: Verifier = Verifier.create(value);
        const verifyResult: VerifyResult = verifier.verify(inputValue);

        if (!verifyResult.succeed) {
            return false;
        }
    }
    return true;
};

export const validateFullProcedurePattern = (
    pattern: PubProcedurePattern,
    input: TaskExecuteInput | TaskExecuteOutput,
): boolean => {

    for (const key of Object.keys(pattern)) {

        const value: Pattern = pattern[key];
        const inputValue: any = input[key];

        const verifier: Verifier = Verifier.create(value);
        const verifyResult: VerifyResult = verifier.verify(inputValue);

        if (!verifyResult.succeed) {
            return false;
        }
    }
    return true;
};

