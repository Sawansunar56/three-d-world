import "./App.css";
import ThreeDSection from "./pages/model";
import Blob from "./assets/actual_hover.svg?react";

function App() {
  return (
    <div className="App">
      <ThreeDSection />
      <div className="some">
        <button>
          Hello there
          <span className="vibe"></span>
        </button>
        <button>
          <img src="fonts/just_font.svg" />
          <Blob className="vibe" />
        </button>
        <button>
          <img src="fonts/move_font.svg" />
        </button>
        <button>
          <img src="fonts/fair_font.svg" />
        </button>
        <button>
          <img src="fonts/white_font.svg" />
        </button>
      </div>
    </div>
  );
}

export default App;
