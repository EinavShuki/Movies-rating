import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SearchScreen from "./screens/SearchScreen";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/movie/:id" component={MovieScreen} exact />
          <Route path="/serach/:title" component={SearchScreen} exact />
        </>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
