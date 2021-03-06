import {List, Map} from "immutable";
import {expect} from "chai";
import {INITIAL_STATE, setEntries, next, vote} from "../src/core";

describe('application logic', () => {

    describe('setEntries', () => {

        it('adds entries to the state', () => {
            const $$state = INITIAL_STATE;
            const entries = ['Trainspotting', '28 Days Later'];
            const $$nextState = setEntries($$state, entries);

            expect($$nextState).to.be.equal(Map({
                $$entries: List.of('Trainspotting', '28 Days Later')
            }));
        });
    });

    describe('next', () => {

        it('takes the next two entries under vote', () => {
            const $$state = Map({
                $$entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
            });
            const $$nextState = next($$state);

            expect($$nextState).to.be.equal(Map({
                $$vote: Map({
                    $$pair: List.of('Trainspotting', '28 Days Later')
                }),
                $$entries: List.of('Sunshine')
            }));
        });

        it('puts winner of current vote back to entries', () => {
            const $$state = Map({
                $$vote: Map({
                    $$pair: List.of('Trainspotting', '28 Days Later'),
                    $$tally: Map({
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    })
                }),
                $$entries: List.of('Sunshine', 'Millions', '127 Hours')
            });
            const $$nextState = next($$state);

            expect($$nextState).to.be.equal(Map({
                $$vote: Map({
                    $$pair: List.of('Sunshine', 'Millions')
                }),
                $$entries: List.of('127 Hours', 'Trainspotting')
            }));
        });

        it('puts both from tied vote back to entries', () => {
            const $$state = Map({
                $$vote: Map({
                    $$pair: List.of('Trainspotting', '28 Days Later'),
                    $$tally: Map({
                        'Trainspotting': 3,
                        '28 Days Later': 3
                    })
                }),
                $$entries: List.of('Sunshine', 'Millions', '127 Hours')
            });
            const $$nextState = next($$state);

            expect($$nextState).to.be.equal(Map({
                $$vote: Map({
                    $$pair: List.of('Sunshine', 'Millions')
                }),
                $$entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
            }));
        });

        it('marks winner when just one entry left', () => {
            const $$state = Map({
                $$vote: Map({
                    $$pair: List.of('Trainspotting', '28 Days Later'),
                    $$tally: Map({
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    })
                }),
                $$entries: List()
            });
            const $$nextState = next($$state);
            expect($$nextState).to.be.equal(Map({
                $$winner: 'Trainspotting'
            }));
        });
    });

    describe('vote', () => {

        it('creates a tally for the voted entry', () => {
            const $$voteState = Map({
                $$pair: List.of('Trainspotting', '28 Days Later')
            });
            const $$nextVoteState = vote($$voteState, 'Trainspotting');

            expect($$nextVoteState).to.be.equal(Map({
                $$pair: List.of('Trainspotting', '28 Days Later'),
                $$tally: Map({
                    'Trainspotting': 1
                })
            }));
        });

        it('adds to existing tally for the voted entry', () => {
            const $$voteState = Map({
                $$pair: List.of('Trainspotting', '28 Days Later'),
                $$tally: Map({
                    'Trainspotting': 3,
                    '28 Days Later': 2
                })
            });
            const $$nextVoteState = vote($$voteState, 'Trainspotting');

            expect($$nextVoteState).to.be.equal(Map({
                $$pair: List.of('Trainspotting', '28 Days Later'),
                $$tally: Map({
                    'Trainspotting': 4,
                    '28 Days Later': 2
                })
            }));
        });
    });
});
