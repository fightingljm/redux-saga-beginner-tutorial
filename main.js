import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

//引入 ./sagas 模块中的 Saga
import { helloSaga, watchIncrementAsync } from './sagas'

import Counter from './Counter'
import reducer from './reducers'

const store = createStore(
    reducer,
    applyMiddleware(createSagaMiddleware(helloSaga,watchIncrementAsync))
)

const action = type => store.dispatch({type})

function render() {
    ReactDOM.render(
        <Counter
            value={store.getState()}
            onIncrement={() => action('INCREMENT')}
            onDecrement={() => action('INCREMENT_ASYNC')}
        />,
        document.getElementById('root')
    )
}

render()
store.subscribe(render)
