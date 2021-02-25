import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/movie/:id" component={MovieScreen} exact />
        </>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
