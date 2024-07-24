import { getProduct, getRawList } from "@/app/lib/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
    const params = req.nextUrl.searchParams
    let arrangement = params.get("arrangement")
    let flowers = params.get("flowers")
    let colors = params.get("colors")
    let priceMin = params.get("priceMin")
    let priceMax = params.get("priceMax")

    let data = await getRawList({ arrangement, flowers, colors, priceMin, priceMax })

    // // sending filters too
    // let flowerFilters = []
    // let ArrangementFilters = []
    // let ColorFilters = []

    // // variables for loop
    // colors = [] // reassignment doesnt matter were not using it again
    // let types = []

    // data.forEach((e) => {
    //     // setting flower filter
    //     if (e.TYPE === "SINGLE FLOWER") {
    //         let t = (e.NAME).slice(6, e.NAME.indexOf("Flower"))
    //         flowerFilters.push(
    //             <option value={t} text={t} id={t} key={t}> {t}</option>
    //         )
    //     }

    //     //setting arrangement filters
    //     let t = e.TYPE
    //     let Ele = <option value={t} text={t} id={t} key={t} > {t}</option>
    //     if (!types.includes(t)) {
    //         ArrangementFilters.push(Ele)
    //         types.push(t)
    //     }

    //     // setting color filters
    //     let c = JSON.parse(e.COLOR)
    //     c.forEach((e) => {
    //         e = e.toLowerCase()
    //         e = e.charAt(0).toUpperCase() + e.slice(1)
    //         if (!colors.includes(e)) colors.push(e)
    //     })
    // })

    // // settting color fiters
    // colors.forEach((t) => {
    //     ColorFilters.push(
    //         <option value={t} text={t} id={t} key={t}> {t}</option>
    //     )
    // })

    // let filters = {
    //     arrangement: ArrangementFilters,
    //     color:ColorFilters
    // }

    return NextResponse.json(JSON.stringify(data))
}

export async function POST(res) {
    let data = await res.json()
    let id = data.id

    let productData = await getProduct(id)
    return NextResponse.json(JSON.stringify(productData))
}