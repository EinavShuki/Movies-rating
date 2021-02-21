import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import MoviScreen from "./screens/MovieScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/movie" component={MoviScreen} exact />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
