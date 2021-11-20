import "./App.css";
import { StoreContext } from "storeon/react";
import { NavigationBar } from "./components/NavigationBar";
import { Col, Container, Row } from "react-bootstrap";
import { Welcome } from "./components/Welcome";
import { Footer } from "./components/Footer";
import { AddBook } from "./components/AddBook";
import { BookList } from "./components/BookList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { store } from "./store";
import { CartList } from "./components/CartList";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { SearchPage } from "./components/SearchPage";
import { useEffect, useState } from "react";
import { AppContext } from "./lib/contextLib";
import { Auth } from "aws-amplify";

function App() {
  const marginTop = {
    marginTop: "20px",
  };

  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
      console.log(isAuthenticated);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }

    console.log(Auth.currentSession());

    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating && (
      <StoreContext.Provider value={store}>
        <Router>
          <NavigationBar />
          <Container>
            <Row>
              <Col lg={12} style={marginTop}>
                <Switch>
                  <AppContext.Provider
                    value={{ isAuthenticated, userHasAuthenticated }}
                  >
                    <Route path="/" exact component={Welcome} />
                    <Route path="/add" exact component={AddBook} />
                    <Route path="/list" exact component={BookList} />
                    <Route path="/registration" exact component={Register} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/cart" exact component={CartList} />
                    <Route path="/search" exact component={SearchPage} />
                  </AppContext.Provider>
                </Switch>
              </Col>
            </Row>
          </Container>
          <Footer />
        </Router>
      </StoreContext.Provider>
    )
  );
}

export default App;
