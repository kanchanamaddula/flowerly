import { load } from "cheerio";

async function main() {
    // switch url later
    let url = "https://www.fnp.com/flowers-lp"

    let pageHTML = await fetch(url)
    let text = await pageHTML.text()
    const $ = load(text)


    $(".products").find("div").each((_index, element) => {
        if (element.name == "div") {
            let img = (($(element).attr("data-img-url")))
            let imageUrl = url + img
            
            if (img != undefined){
                imageUrl = (imageUrl.replace(".jpg_1","_1").replace("/m/","/l/"))
            }
        }
    })

}

main()