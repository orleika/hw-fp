import riot from 'riot'
import {
  applyMiddleware,
  createStore
} from 'redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import reducers from 'reducers'

import 'tags/app'
import 'tags/message-snackbar'

const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducers,
  applyMiddleware(...middleware)
)

document.addEventListener('DOMContentLoaded', () => {
  riot.mount('app', {store, appName: APP_NAME})
})
