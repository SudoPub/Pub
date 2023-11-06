/**
 * @author WMXPY
 * @namespace JustRun
 * @description Orchestrator Full Cycle
 * @override E2E Test
 */

import { expect } from 'chai';
import { PUB_PLAN_TYPE, PubOrchestrator, PubPlan } from '../../../src';
import { justRunExample } from '../../example/just-run';

describe('Given (Just-Run Orchestrator Full Cycle) Use Case', (): void => {

    const orchestrator: PubOrchestrator =
        PubOrchestrator.fromWorkflowConfiguration(justRunExample);

    it('Should be able to plan for initial input', (): void => {

        const nextPlans: Array<PubPlan<PUB_PLAN_TYPE>> = orchestrator.planNext();

        console.log(nextPlans);

        expect(nextPlans).to.be.lengthOf(1);

        expect(nextPlans[0].type).to.be.equal(PUB_PLAN_TYPE.INITIAL_START);
    });
});
