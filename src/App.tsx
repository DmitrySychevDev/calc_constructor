import React from "react";
import { Provider } from "react-redux";

// Store
import { store } from "./app/store";

// Pages
import { Home } from "./pages";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Home />
      </div>
    </Provider>
  );
}

export default App;
