/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import reducer from './reducers/index';
import { Creators as ItemActions } from "./reducers/Items";
import saga from './sagas';

// Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Add middleware enhancers
const composeEnhancers = composeWithDevTools({
    actionCreators: ItemActions
});

export default function configureStore () {
    // Build Redux Store
    const store = createStore(
        reducer,
        composeEnhancers(
            // Apply saga middleware
            applyMiddleware(sagaMiddleware)
        )
    );
    // run the root saga
    sagaMiddleware.run(saga);
    return store;
}