"use client"

import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'
import NavBar from "@/app/Compnents/NavBar"

import "./styles.css"


function SingleFlower(props) {
    let info = JSON.parse(props.product.INFO)
    return <>
        <div className="background">
            <video autoPlay muted src={info.video} ></video>
        </div>
        <NavBar />
        <div>
            <div className="content">
                <div className="info">
                    <h1 className="name">{info.name}</h1>
                    <div className="flower-info">
                        <div className="description">
                            {info.description}
                            {/* Chrysanthemums, sometimes called mums or chrysanths, are flowering plants of the genus Chrysanthemum in the family Asteraceae. */}
                        </div>
                        <div className="headers">
                            <div className="headers-container">
                                <h1 className="info-header">
                                    ORIGIN
                                </h1>
                                <div className="info-content">
                                    {/* Asia, northern Europe. */}
                                    {info.origin}
                                </div>
                            </div>
                            <div className="headers-container">
                                <h1 className="info-header">
                                    Family
                                </h1>
                                <div className="info-content">
                                    {/* Asteraceae */}
                                    {info.family}
                                </div>
                            </div>
                            <div className="headers-container">
                                <h1 className="info-header">
                                    Price
                                </h1>
                                <div className="info-content">
                                    {/* 40 INR */}
                                    {props.product.PRICE}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}


export default function Page() {

    let [isBusy, setIsBusy] = useState(true)
    let pathname = usePathname()
    let id = pathname.slice(pathname.indexOf('s') + 2)
    console.log(id)
    let [result, setResult] = useState("no")
    useEffect(() => {
        async function a() {
            if (isBusy) {
                let res = await fetch('http://localhost:3000/api/products', {
                    method: 'POST',
                    body: JSON.stringify({ id: id })
                })

                result = JSON.parse(await res.json())
                setResult(result)
                setIsBusy(false)
            }
        }
        a()
    })
    return <>
        {(!isBusy && result != "no") ?
            <div className="productContainer">
                {(result.TYPE === "SINGLE FLOWER") ? <SingleFlower product={result} /> : <div>uh oh</div>}
            </div> :
            <div>loading</div>
        }
    </>
}