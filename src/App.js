import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import React, { Suspense } from "react";

const Forms = React.lazy(() => import("./pages/forms"));
const FormDetail = React.lazy(() => import("./pages/formDetail"));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Oops! Bir hata oluştu.</h1>;
    }

    return this.props.children;
  }
}

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/" element={<Forms />} />
            <Route path="/forms/:name" element={<FormDetail />} />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
