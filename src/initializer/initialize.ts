/**
 * @author WMXPY
 * @namespace Initializer
 * @description Initialize
 */

import { IEspialMethod } from "../espial/definition/method";

export type InitializeEspialMethodsResultDetail = {

    readonly method: IEspialMethod;
    readonly success: boolean;
};

export type InitializeEspialMethodsResult = {

    readonly methods: InitializeEspialMethodsResultDetail[];
};

export const initializeEspialMethods = async (
    espialMethods: IEspialMethod[],
): Promise<InitializeEspialMethodsResult> => {

    const result: InitializeEspialMethodsResultDetail[] = [];

    for (const method of espialMethods) {

        const succeed: boolean = await method.initialize();

        result.push({
            method,
            success: succeed,
        });
    }

    return {
        methods: result,
    };
};
