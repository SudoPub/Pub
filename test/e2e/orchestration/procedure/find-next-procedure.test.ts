/**
 * @author WMXPY
 * @namespace Orchestration_Procedure
 * @description Find Next Procedure
 * @override E2E Test
 */

import { expect } from 'chai';
import { findNextProcedures } from '../../../../src/orchestration/procedure/find-next-procedure';
import { PubProcedureConfiguration } from '../../../../src/procedure/definition/configuration';
import { PubCachedWorkflowConfiguration } from '../../../../src/workflow/cache/configuration';
import { justRunExample, justRunExampleStartProcedure } from '../../../example/just-run';

describe('Given (Orchestration-Procedure Find Next Procedure) Use Case', (): void => {

    const justRunConfiguration: PubCachedWorkflowConfiguration = PubCachedWorkflowConfiguration.fromWorkflowConfiguration(
        justRunExample,
    );

    it('Should be able to find next procedure for start procedure', (): void => {

        const nextProcedures: PubProcedureConfiguration[] = findNextProcedures(
            justRunExampleStartProcedure,
            justRunConfiguration,
        );

        expect(nextProcedures).to.be.lengthOf(1);
    });
});
