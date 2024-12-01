import Brands from "./component/Brands/Brands";
import Header from "./component/Header/Header";
import Home from "./component/Home/Home";

function App() {
  return (
    <div className="font-jost bg-white min-h-screen">
      <Header />
      <Home />
      <Brands />
    </div>
  );
}

export default App;
