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
    // const chicken_aspect =
    // {
    //   position: new Three.Vector3(164, 100, 708),
    //   lookAt: new Three.Vector3(-199, -120, 194)
    // }
    // const pachenko_aspect = {
    //   position: new Three.Vector3(570, 160, 320),
    //   lookAt: new Three.Vector3(102, 34, 627)
    // }
    // setTarget();
  }
  const [bloom, setBloom] = useState<boolean>(false);
  const chicken_aspect =
  {
    position: new Three.Vector3(164, 100, 708),
    lookAt: new Three.Vector3(-199, -120, 194)
  }
  const pachenko_aspect = {
    position: new Three.Vector3(1257, 952, 270),
    lookAt: new Three.Vector3(975, 1066, 464)
  }
  const girl_aspect = {
    position: new Three.Vector3(-49, 157, 1601),
    lookAt: new Three.Vector3(46, -235, 2413)
  }
  const camel_aspect = {
    position: new Three.Vector3(392, 166, 288),
    lookAt: new Three.Vector3(412, 80, -24)
  }

  const handleClick = (index: number) => {
    let pachenko_color = 'hsl(55, 90%, 70%)';
    let chicken_color = 'hsl(234, 32%, 19%)';
    let girl_color = 'hsl(199, 100%, 41%)';
    let camel_color = 'hsl(32, 67%, 72%)';
    // moveCamera();
    if (true) {
      switch (index) {
        case 0:
          {
            document.body.style.backgroundColor = chicken_color;
            // setTarget({
            //   position: new Three.Vector3(570, 160, 320),
            //   lookAt: new Three.Vector3(102, 34, 627)
            // });
            setTarget(chicken_aspect);
            setBloom(false);
          } break
        case 1:
          {
            document.body.style.backgroundColor = pachenko_color;
            setTarget(pachenko_aspect);
            setBloom(false);
          } break
        case 2:
          {
            document.body.style.backgroundColor = girl_color;
            setTarget(girl_aspect);
            setBloom(false);
          } break;
        case 3:
          {
            document.body.style.backgroundColor = camel_color;
            setBloom(true);
            setTarget(camel_aspect);
          }
      }
    }
  }

  return (
    <div className="App">
      <ThreeDSection isBloom={bloom} target={target}/>
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
