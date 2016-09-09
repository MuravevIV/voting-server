import {expect} from "chai";
import {List, Map} from "immutable";

describe('immutability', () => {

    describe('a number', () => {

        function increment(currentState) {
            return currentState + 1;
        }

        it('is immutable', () => {
            let state = 42;
            let nextState = increment(state);

            expect(nextState).to.be.equal(43);
            expect(state).to.be.equal(42);
        });
    });

    describe('A List', () => {

        var addMovie = function ($$currentState, movie) {
            return $$currentState.push(movie);
        };

        it('is immutable', () => {
            let $$state = List.of('Trainspotting', '28 Days Later');
            let $$nextState = addMovie($$state, 'Sunshine');

            expect($$nextState).to.be.equal(List.of(
                'Trainspotting',
                '28 Days Later',
                'Sunshine'
            ));
            expect($$state).to.be.equal(List.of(
                'Trainspotting',
                '28 Days Later'
            ));
        });
    });

    describe('a tree', () => {

        function addMovie($$currentState, movie) {
            return $$currentState.update('$$movies', $$movies => $$movies.push(movie))
        }

        it('is immutable', () => {
            let $$state = Map({
                $$movies: List.of('Trainspotting', '28 Days Later')
            });
            let $$nextState = addMovie($$state, 'Sunshine');

            expect($$nextState).to.be.equal(Map({
                $$movies: List.of(
                    'Trainspotting',
                    '28 Days Later',
                    'Sunshine'
                )
            }));
            expect($$state).to.be.equal(Map({
                $$movies: List.of(
                    'Trainspotting',
                    '28 Days Later'
                )
            }));
        });
    });
});
