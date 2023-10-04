/**
 * @author WMXPY
 * @namespace Mock
 * @description Resource Manager
 * @override Test
 */

import { OrchestrationResourceManager } from "../../src/orchestration/resource/manager";

export const createMockResourceManager = (): OrchestrationResourceManager => {

    return OrchestrationResourceManager.fromScratch();
};
