"use client"
import React, { useEffect, useState } from "react"
import "./productPageStyles.css"
import NavBar from "../Compnents/NavBar"
import Link from "next/link"
import { motion } from "framer-motion"


function ItemCard({ data }) {
    let price = data.PRICE.split(" ")[0]

    return <motion.div className="ItemCard" onClick={(e) => { window.location = "/products/" + data.ID }}>
        {/* <img src={data.IMAGE} className="productImage" /> */}
        <img src="http://localhost:3000/Assets/Flowers/dahilaPinnata/dahilaPinnata.jpg" className="productImage" />
        <h1 className="ItemName">{data.NAME}</h1>
        <div className="ItemPriceInfo">
            <h1 className="ItemPrice"> {data.PRICE}</h1>
            <h2 className="ItemSeller">From: <Link className="SellerLink" href={`https://${data.ORIGIN}`}>{data.ORIGIN}</Link></h2>
        </div>
    </motion.div>
}


export default function ListProducts() {
    let res = "", result = "[]", initial = true
    let [isBusy, setIsBusy] = useState(true)

    let [data, setData] = useState("[]")
    let [ItemCards, setItemCards] = useState([])

    let [openDrawer, setOpenDrawer] = useState(false)

    let [priceMin, setPriceMin] = useState(0)
    let [priceMax, setPriceMax] = useState(10000)

    let [flowerFilters, setFlowerFilters] = useState([])
    let [ArrangementFilters, setArrangementFilters] = useState([])
    let [ColorFilters, setColorFilters] = useState([])

    let [appliedColorFilters, setAppliedColorFilters] = useState([])
    let [appliedFlowerFilters, setAppliedFlowerFilters] = useState([])
    let [appliedArrangementFilters, setAppliedArrangementFilters] = useState([])
    let [appliedPriceFilters, setAppliedPriceFilters] = useState([])


    let types = []
    let colors = []

    let setProductData = (productData) => {
        ItemCards = []
        data = []

        let singleFlowerData = []
        singleFlowerData.push(<h1 className="category" key={"CategoryTextSingleFlower"}> Single Flowers</h1>)
        let singleFlowerDataElements = []

        let bouquetFlowerData = []
        let bouquetDataElements = []
        bouquetFlowerData.push(<h1 className="category" key={"CatergoryTextBouququet"} id="bouquetCategory"> Bouquets</h1>)

        setData(JSON.parse(productData))

        // let productsSorted = sortProducts(productData,{color:"",arrangement:"",flower:"",priceMin:"",priceMax:100000})

        // TODO: generalise the generation of the ui
        // apply filters
        // imporve ui pls

        JSON.parse(productData).forEach(e => {
            if (e.TYPE === "SINGLE FLOWER") {
                // for only single flower products, add more cases for more categories
                singleFlowerDataElements.push(<ItemCard data={e} key={JSON.stringify(e)} />)
            } else if (e.TYPE === "BOUQUET") {
                bouquetDataElements.push(<ItemCard data={e} key={JSON.stringify(e)} />)
            }

            data.push(e)

            //setting filters
            // setting up flower filter
            if (e.TYPE === "SINGLE FLOWER") {
                let t = (e.NAME).slice(6, e.NAME.indexOf("Flower"))
                flowerFilters.push(
                    <option value={t} text={t} id={t} key={t}> {t}</option>
                )
            }

            let t = e.TYPE
            let Ele = <option value={t} text={t} id={t} key={t} > {t}</option>
            if (!types.includes(t)) {
                ArrangementFilters.push(Ele)
                types.push(t)
            }

            let c = JSON.parse(e.COLOR)
            c.forEach((e) => {
                e = e.toLowerCase()
                e = e.charAt(0).toUpperCase() + e.slice(1)
                if (!colors.includes(e)) colors.push(e)
            })
        });

        // single flowers
        singleFlowerData.push(<div className="singleFlowerSection" key="singleFlowersData">{singleFlowerDataElements}</div>)
        ItemCards.push(<motion.div className="singleFlowerContainer" whileInView={{ opacity: 1, x: -1 }} viewport={{ once: true }} onViewportEnter={(e) => { document.getElementById("singleFlowerSection").scrollIntoView({ behavior: 'instant', block: 'center' }) }} id="singleFlowerSection" key={"singleFlowerSection"}>{singleFlowerData}</motion.div>)

        // bouquets
        bouquetFlowerData.push(<motion.div className="singleFlowerSection" id="bouquetFlowerData" key="singleFlowersData">{bouquetDataElements}</motion.div>)
        ItemCards.push(<motion.div className="singleFlowerContainer" whileInView={{ opacity: 1, x: -1 }} viewport={{ once: true }} onViewportEnter={(e) => { document.getElementById("bouquetFlowerData").scrollIntoView({ behavior: 'instant', block: 'start' }) }} key={"bouquetFlowerSelection"}>{bouquetFlowerData}</motion.div>)

        colors.forEach((t) => {
            ColorFilters.push(
                <option value={t} text={t} id={t} key={t}> {t}</option>
            )
        })

        setColorFilters([...ColorFilters])
        setItemCards([...ItemCards])
        setData([...data])
        setArrangementFilters([...ArrangementFilters])
        setFlowerFilters([...flowerFilters])
    }

    useEffect(() => {
        async function a() {
            if (isBusy) {
                res = await fetch(`http://localhost:3000/api/products?arrangement=${JSON.stringify(appliedArrangementFilters)}&flowers=${JSON.stringify(appliedFlowerFilters)}&colors=${JSON.stringify(appliedColorFilters)}&priceMin=${priceMin}&priceMax=${priceMax}`, {
                    method: 'GET',
                })
                result = await res.json()
                setProductData(result)
                setIsBusy(false)
            }
        }
        a()
    })

    async function applyColorFilters() {
        let select = document.getElementById("colors")
        let selectedList = select.selectedOptions[0].value.toUpperCase();

        let t = 0
        for (t = 0; t < ColorFilters.length; t++) {
            if (ColorFilters[t].props.value.toUpperCase() === selectedList) {
                break;
            }
        }

        ColorFilters.splice(t, 1)
        appliedColorFilters.push(
            <div key={`sekected ${selectedList}`} className="colorFilter" style={{ backgroundColor: selectedList.toLowerCase() }}></div>
        )

        setColorFilters([...ColorFilters])
        setAppliedColorFilters([...appliedColorFilters])

        console.log(ColorFilters)
    }

    async function applyArrangementFilters() {
        let select = document.getElementById("arrangement")
        let selectedList = select.selectedOptions[0].value.toUpperCase();

        let t = 0
        for (t = 0; t < ArrangementFilters.length; t++) {
            if (ArrangementFilters[t].props.value.toUpperCase() === selectedList) {
                break;
            }
        }

        ArrangementFilters.splice(t, 1)
        appliedArrangementFilters.push(
            <div key={`sekected ${selectedList}`} className="arrangement">{selectedList}</div>
        )

        setArrangementFilters([...ArrangementFilters])
        setAppliedArrangementFilters([...appliedArrangementFilters])

    }

    async function applyFlowerFilters() {
        let select = document.getElementById("flowers")
        let selectedList = select.selectedOptions[0].value.toUpperCase();

        let t = 0
        for (t = 0; t < flowerFilters.length; t++) {
            if (flowerFilters[t].props.value.toUpperCase() === selectedList) {
                break;
            }
        }

        flowerFilters.splice(t, 1)
        appliedFlowerFilters.push(
            <div key={`sekected ${selectedList}`} className="arrangement">{selectedList}</div>
        )

        setFlowerFilters([...flowerFilters])
        setAppliedFlowerFilters([...appliedFlowerFilters])
    }


    return <>
        <NavBar />
        <div className="menu">
            <motion.div className="hoverDiv">
                {/* // Price, Flower Type, Arragmenet ,Colors, also, enter a color scheme and itll generate a product for you,delivery date if pincode is given */}
                <motion.div className="filters" id="drawer" initial={{ x: -800 }} transition={{ type: "spring", ease: "easeIn", duration: 0.50 }} animate={openDrawer ? { x: 0 } : { x: -800 }}>
                    <motion.div className="close"><button onClick={() => { setOpenDrawer(false) }}>CLOSE</button></motion.div>
                    <motion.div className="Price">
                        <div className="Text">Price</div>
                        <hr />
                        <div className="ranges">
                            <input type="number" id="min" placeholder="min" value={priceMin} onChange={(e) => { e.preventDefault(); setPriceMin(Math.abs(e.target.value)) }}></input>
                            <input type="number" id="max" placeholder="max" value={priceMax} onChange={(e) => { e.preventDefault(); setPriceMax(e.target.value) }}></input>
                        </div>
                        <datalist id="markers">
                            <option value={priceMin}></option>
                            <option value={Math.floor((priceMax - priceMin) * 0.25)}></option>
                            <option value={Math.floor((priceMax - priceMin) * 0.5)}></option>
                            <option value={Math.floor((priceMax - priceMin) * 0.75)}></option>
                            <option value={priceMax}></option>
                        </datalist>
                    </motion.div> {/* TODO: get localised sybole*/}
                    <div className="appliedPrice">{appliedPriceFilters}</div>
                    <motion.div className="FlowerType">
                        <div className="Text">Flowers</div>
                        <div className="filterSelection">
                            <select className="flowersFilters" id="flowers">
                                {(!isBusy) ? flowerFilters : <option>Loading</option>}
                            </select>
                            <button onClick={(e) => { applyFlowerFilters() }}> +</button>
                        </div>
                        <div className="appliedFlowers">{appliedFlowerFilters}</div>
                    </motion.div>
                    <motion.div className="Arrangement">
                        <div className="Text">Arragement</div>
                        <div className="filterSelection">
                            <select className="flowersFilters" id="arrangement">
                                {(!isBusy) ? ArrangementFilters : <option>Loading</option>}
                            </select>
                            <button onClick={(e) => { applyArrangementFilters() }}>+</button>
                        </div>
                        <div className="appliedArrangement">{appliedArrangementFilters}</div>
                    </motion.div>
                    <motion.div className="Color">
                        <div className="Text">Colors</div>
                        <div className="filterSelection">
                            <select className="flowersFilters" id="colors">
                                {ColorFilters}
                            </select>
                            <button onClick={() => { applyColorFilters() }}>+</button>
                        </div>
                        <div className="appliedColors" id="appliedColors">
                            {appliedColorFilters}
                        </div>
                    </motion.div>
                    <button className="apply">APPLY</button>
                </motion.div>
            </motion.div>
        </div>
        <div className="container">
            {(!isBusy) ? ItemCards : <div>Loading</div>}
        </div>
        <div className={`fab ${(openDrawer ? "disappear" : "")}`}>
            <button className="fabButton" onClick={() => { setOpenDrawer(true); console.log(openDrawer) }}><img className="icon" src="/Assets/Icons/filter.svg"></img></button>
        </div>
    </>
}