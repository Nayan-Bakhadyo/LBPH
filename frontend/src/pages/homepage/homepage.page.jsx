import React, { Suspense } from 'react';
import './homepage.page.css';
import Header from '../../components/header/header.component';
import Typewriter from 'typewriter-effect';
import Button from "@mui/material/Button";
// import Globe from 'react-globe.gl';
import { Canvas } from "@react-three/fiber";
import Earth from "../../components/earth/earth.component";


function HomePage() {
  // const N = 20;
  // const arcsData = [...Array(N).keys()].map(() => ({
  //   startLat: (Math.random() - 0.1) * 180,
  //   startLng: (Math.random() - 0.1) * 360,
  //   endLat: (Math.random() - 0.1) * 180,
  //   endLng: (Math.random() - 0.1) * 360,
  //   color: [['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)], ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]]
  // }));
  return (
    <div className='home__page'>
      <div className="home__head">
        <Header />
      </div>
      <div className="content">
        <div className="typewritereffect">
          <div className="typewriter__effect1">
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("Contact Tracing")
                  .pauseFor(1000)
                  .deleteAll()
                  // .typeString("Welcomes You")
                  .start();
              }}

            />
          </div>
          <div className="typewriter__effect2">
            <p> Wear Mask when in an crowded place. Wash Your Hands Often For Atleast 20 second.
              Maintain a safe distance from others (at least 1 metre), even if they don’t appear to be sick.
              Cover your nose and mouth with your bent elbow or a tissue when you cough or sneeze.</p>
            <Button className='p__button' style={{ color: "white !important" }}><b>SignUp for New</b></Button>
          </div>
        </div>
        <div className="spin__glob">
          {/* <Globe
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            arcsData={arcsData}
            arcColor={'color'}
            arcDashLength={() => Math.random() - 0.1}
            arcDashGap={() => Math.random()}
            arcDashAnimateTime={() => Math.random() * 40000 + 700}
            backgroundColor='#000d1a'
            width={605}
            height={500}

          />, */}
          <Canvas>
            <Suspense fallback={null}>
              <Earth />
            </Suspense>
          </Canvas>
        </div>
      </div>

    </div>);
}

export default HomePage;
