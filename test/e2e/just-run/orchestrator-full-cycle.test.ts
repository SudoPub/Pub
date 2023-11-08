/**
 * @author WMXPY
 * @namespace JustRun
 * @description Orchestrator Full Cycle
 * @override E2E Test
 */

import { PUB_ACTION_TYPE, PUB_PLAN_TYPE, PubPlan, createPubAction } from '@sudopub/essential';
import { expect } from 'chai';
import * as Chance from 'chance';
import { PubOrchestrator } from '../../../src';
import { justRunExample, justRunExampleStartProcedure } from '../../example/just-run';
import { ExpectPlan } from '../../expect/expect-plan';

describe('Given (Just-Run Orchestrator Full Cycle) Use Case', (): void => {

    const chance: Chance.Chance = new Chance('e2e-just-run-param-mapping');

    const helloMessage: string = chance.string();

    const orchestrator: PubOrchestrator =
        PubOrchestrator.fromWorkflowConfiguration(justRunExample);

    it('Should be able to plan for initial input', (): void => {

        const nextPlans: Array<PubPlan<PUB_PLAN_TYPE>> = orchestrator.planNext();

        expect(nextPlans).to.be.lengthOf(1);

        const payload = ExpectPlan.with(nextPlans[0])
            .assertPlanPayloadWithType(PUB_PLAN_TYPE.INITIAL_START);

        expect(payload.procedure.identifier).to.be
            .equal(justRunExampleStartProcedure.identifier);

        const applyResult: boolean = orchestrator.applyAction(
            createPubAction(PUB_ACTION_TYPE.TASK_RESOLVE_SUCCEED, {
                taskIdentifier: nextPlans[0].taskIdentifier,
                output: {
                    hello: helloMessage,
                },
            })
        );

        expect(applyResult).to.be.true;
    });

    it('Should be able to plan for first driver', (): void => {

        const nextPlans: Array<PubPlan<PUB_PLAN_TYPE>> = orchestrator.planNext();

        expect(nextPlans).to.be.lengthOf(1);

        const payload = ExpectPlan.with(nextPlans[0])
            .assertPlanPayloadWithType(PUB_PLAN_TYPE.EXECUTE_DRIVER);

        expect(payload.procedure.identifier).to.be.equal("JUST_RUN");
    });
});
