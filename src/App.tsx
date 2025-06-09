import "./App.css";
import ThreeDSection from "./pages/model";
import Blob from "./assets/actual_hover.svg?react";

function App() {
  const something = [
    // "fonts/just_font.svg",
    "fonts/move_font.svg",
    "fonts/fair_font.svg",
    "fonts/white_font.svg"
  ]
  return (
    <div className="App">
      <ThreeDSection />
      <div className="some">
        <button>
          Hello there
          <span className="vibe"></span>
        </button>
        {something.map((item, index) => (
          <button key={index}>
            <img src={item} />
            <Blob className="vibe" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
