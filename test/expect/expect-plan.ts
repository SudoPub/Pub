/**
 * @author WMXPY
 * @namespace Expect
 * @description Expect Plan
 * @override Expect
 */

import { expect } from 'chai';
import { PUB_PLAN_TYPE, PubPlan } from '../../src';

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
}
