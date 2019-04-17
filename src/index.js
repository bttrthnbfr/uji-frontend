import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import ScrollToTop from "react-router-scroll-top"
import store, { history } from "./store"
import App from "./containers/app"

import "sanitize.css/sanitize.css"
import "./index.css"

const target = document.querySelector("#root")

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {/* <ScrollToTop> */}
        <App />
      {/* </ScrollToTop> */}
    </ConnectedRouter>
  </Provider>,
  target
)
