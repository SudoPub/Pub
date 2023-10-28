/**
 * @author WMXPY
 * @namespace Workflow
 * @description Basic
 * @override E2E Test
 */

import { expect } from 'chai';
import { PubExecuter } from '../../../src';
import { createMockResourceManager } from '../../mock/resource-manager';

describe('Given (Workflow Basic) Use Case', (): void => {

    const resourceManager = createMockResourceManager();

    it('Should be able to init just run workflow', (): void => {

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const executer: PubExecuter = PubExecuter.create({

        } as any, resourceManager);

        expect(1).to.be.equal(1);
    });
});
