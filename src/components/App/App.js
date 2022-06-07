import './App.css';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <Header />
        {/* <Main /> */}
        <Movies />
        <Footer />
      </div>
    </div>
  );
}

export default App;
