/**
 * @author WMXPY
 * @namespace Expect
 * @description Expect Plan
 * @override Expect
 */

import { PUB_PLAN_TYPE, PubPlan, PubPlanPayloadSwitch } from '@sudopub/essential';
import { expect } from 'chai';

/* eslint-disable @typescript-eslint/no-unused-expressions */
export class ExpectPlan {

    public static with(
        plan: PubPlan<PUB_PLAN_TYPE>,
    ): ExpectPlan {

        return new ExpectPlan(plan);
    }

    private readonly _plan: PubPlan<PUB_PLAN_TYPE>;

    private constructor(
        plan: PubPlan<PUB_PLAN_TYPE>,
    ) {

        this._plan = plan;
    }

    public toHasPlanType(type: PUB_PLAN_TYPE): this {

        expect(this._plan.type).to.be.equal(type);
        return this;
    }

    public assertPlanPayloadWithType<T extends PUB_PLAN_TYPE>(
        type: T
    ): PubPlanPayloadSwitch<T> {

        expect(this._plan.type).to.be.equal(type);
        return this._plan.payload as PubPlanPayloadSwitch<T>;
    }
}
