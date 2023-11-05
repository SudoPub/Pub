/**
 * @author WMXPY
 * @namespace Task_Mapping
 * @description Validate Pattern
 */

import { Pattern } from "@sudoo/pattern";
import { PubProcedurePattern } from "../../procedure/definition/configuration";
import { TaskExecuteInput, TaskExecuteOutput } from "../definition/task";
import { Verifier } from "@sudoo/verify";

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

        if (!verifier.verify(inputValue)) {
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

        if (!verifier.verify(inputValue)) {
            return false;
        }
    }
    return true;
};

