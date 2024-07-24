"use client"
import { useSession, signin, signout, SessionProvider } from "next-auth/react"
import "./styles.css"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Auth() {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className="loggedInAuth">
        <div><img src={session.user.image}></img></div>
        <div className="info">
          <div className="username">{(session.user.name)}</div>
          <button className='signOut' onClick={() => signout()}>sign out</button>
        </div>
      </div>
    )
  }
  return (
    <>
      not signed in <br />
      <button onClick={() => signin()}>sign in</button>
    </>
  )
}

function FlowersBg() {
  return (
    <div className="flowerBg">
      <img src="/Assets/landingPage/flowersbg.png" />
    </div>
  )
}

function Footer() {
  return <div className="Footer">

  </div>
}
export default function Home({ session }) {
  let bouquets = []
  let bouquetsColors = ["red", "black", "blue", "purple", "#9D968B", "#4C4944"]
  let bouquetsCounter = 0

  let i = Math.floor(1 + 7 * Math.random())
  let canvas = null

  useEffect(() => {
    document.getElementsByClassName("bg")[0].style.backgroundImage = "url(\"" + `/Assets/bg/bg${i}.jpg` + "\")"
  })

  for (let i = 1; i < 7; i++) {
    bouquets.push(<img key={i} id={"bouquets" + (i - 1)} src={`/Assets/bouquets/bouquet${i}.jpg`} />)
  }
  function nextOnclick(x, y) {
    let counter = 0

    bouquetsCounter++
    bouquetsCounter %= 6

    console.log("animation started: ", canvas.fillStyle, " counter: ", counter)
    for (counter = 0; counter <= 1.5 * window.innerWidth; counter++) {
      
    }

    document.getElementById("bouquets" + bouquetsCounter).scrollIntoView()
  }



  return (
    <SessionProvider session={session}>
      <div className="parent">
        <div className="info">
          <div className="bg"></div>
          <div className="bars">
            <div className="bar1 bar"></div>
            <div className="bar2 bar"></div>
            <div className="bar3 bar"></div>
          </div>
          <h1 className="name">Flowerly</h1>
        </div>

        <div className="bouquet">
          <FlowersBg />
          <div className="imageContainer">
            <div className="image">
              <img src="/Assets/bouquets/bouquet2.jpg" />
              <div>
                <div className="bouquetText"><span className="bouquet-image-overlap">Bo</span>uquets</div>
                <div className="bouquetPromo">Buy our Exquisite Bouquets Right now</div>
              </div>
            </div>
          </div>
        </div>

        <div className="OccasionsContainer">
          <div className="Occasions" id="occasions">
            <div className="textSection">
              <div className="OccasionTitle">
                <h1>Bouquets, For <motion.span className="every"> every </motion.span> Occasion.</h1>
              </div>

              <div className="description">
                gdhjsx ifv vde vfugi vedu vre
              </div>
            </div>
            <div className="bouquetsSlides">
              <div className="bouquetsImage">
                {bouquets}
              </div>
              <motion.div className="nextButton" id="nextButton" initial={{ border: "2px dotted black" }} whileHover={{ border: "2px solid black" }} onClick={(e) => { nextOnclick(e.clientX, e.clientY) }}>Next</motion.div>
            </div>
          </div>
          <div className="backgroundCanvas" id="background"></div>
        </div>

        {/* TODO: add Footer and navbar */}

      </div>

    </SessionProvider>
  )
}
