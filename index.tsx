import React, { Component } from "react";
import { render } from "react-dom";

import Hello from "./Hello";
import ErrorBoundary from "./components/error-bondary";
import PostList from "./components/post-list-component";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

interface AppProps {}
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: "Ocean Nguyen"
    };
  }

  render() {
    return (
      <div className="container">
        <Hello name={this.state.name} />
        <ErrorBoundary>
          <PostList />
        </ErrorBoundary>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
