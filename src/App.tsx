import "./App.css";
import ThreeDSection from "./pages/model";
import Blob from "./assets/actual_hover.svg?react";
import JustFont from "./assets/just_font.svg?react";
import MoveFont from "./assets/move_font.svg?react";
import FairFont from "./assets/fair_font.svg?react";
import WhiteFont from "./assets/white_font.svg?react";
import { useThree } from "@react-three/fiber"

import JustBack from "./assets/just_back.svg?react";
import MoveBack from "./assets/move_back.svg?react";
import FairBack from "./assets/fair_back.svg?react";
import WhiteBack from "./assets/white_back.svg?react";
import * as Three from "three";
import { useState } from "react";

function App() {
  // const something = [
  //   "fonts/just_font.svg",
  //   "fonts/move_font.svg",
  //   "fonts/fair_font.svg",
  //   "fonts/white_font.svg",
  // ];
  const something = [
    {
      font: JustFont,
      back: JustBack
    },
    {
      font: MoveFont,
      back: MoveBack
    },
    {
      font: FairFont,
      back: FairBack
    },
    {
      font: WhiteFont,
      back: WhiteBack
    }
  ]

  const [target, setTarget] = useState<any>(null);
  const moveCamera = () => {
    setTarget({
      position: new Three.Vector3(570, 160, 320),
      lookAt: new Three.Vector3(102, 34, 627)
    });
  }

  const handleClick = (index: number) => {
    let back_color = 'hsl(55, 90%, 70%)';
    // moveCamera();
    // switch (index) {
    //   case 0:
    //     {
    //       document.body.style.backgroundColor = back_color;
    //       setTarget({
    //         position: new Three.Vector3(570, 160, 320),
    //         lookAt: new Three.Vector3(102, 34, 627)
    //       });
    //     } break
    // }
  }

  return (
    <div className="App">
      <ThreeDSection moveCamera={moveCamera} target={target} />
      <div className="some">
        {something.map((item, index) => (
          <button key={index}
            onClick={() => handleClick(index)}
          >
            <div className="actual_font">
              <item.font className="beasty" />
            </div>
            <item.back className="back" />
            <Blob className="vibe" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
