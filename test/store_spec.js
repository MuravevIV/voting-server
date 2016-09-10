import {fromJS} from "immutable";
import {expect} from "chai";
import {INITIAL_STATE} from "../src/core";
import makeStore from "../src/store";

describe('store', () => {

    it('is a Redux store configured with the correct reducer', () => {
        const store = makeStore();

        expect(store.getState()).to.equal(INITIAL_STATE);

        store.dispatch({
            type: 'SET_ENTRIES',
            entries: ['Trainspotting', '28 Days Later']
        });

        expect(store.getState()).to.be.equal(fromJS({
            $$entries: ['Trainspotting', '28 Days Later']
        }));
    });
});
