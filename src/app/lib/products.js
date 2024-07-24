import { PrismaClient } from "@prisma/client";

export async function getRawList({ arrangement, flowers, colors, priceMin, priceMax }) {
    let prisma = new PrismaClient()

    let filters = {}
    filters.AND = {}

    if (arrangement != "[]") filters.AND.TYPE = { equals: arrangement }
    if (flowers != "[]") filters.AND.FLOWERS = { equals: flowers }
    if (colors != "[]") filters.AND.COLOR = { equals: colors }
    filters.AND.PRICE = { gt: priceMin, lt: priceMax }
    
    
    const res = await prisma.PRODUCTS.findMany(
        {
            where: filters
        }
    )

    return res
}

export async function addProduct(product) {
    let prisma = new PrismaClient()

    var crypto = require("crypto");
    var id = crypto.randomBytes(20).toString('hex');
    product.ID = id

    let res = prisma.PRODUCTS.create({
        data: product
    })

    return res
}

export async function getProduct(id) {
    let prisma = new PrismaClient()
    const product = await prisma.PRODUCTS.findUnique({
        where: {
            ID: id,
        },
    })
    return product
}