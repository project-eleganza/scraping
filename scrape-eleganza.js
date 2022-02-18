import fetch from 'node-fetch';
import { request, gql } from 'graphql-request'

const apiUrl = 'http://localhost:1337'
const websiteUrl = 'https://www.eleganza-shop.com/fr/enfants/'

// Import de puppeteer
import puppeteer from 'puppeteer';

const getData = async () => {
    // 1 - Créer une instance de navigateur
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    // 2 - Naviguer jusqu'à l'URL cible
    await page.goto(websiteUrl)

    // Spécifier la taille de la fenêtre de navigation
    await page.setViewport({ width: 1600, height: 800 })

    await page.click(
        "#CybotCookiebotDialogBodyButtonAccept"
    )
    await page.waitFor(1000) // fait une pause d'une seconde

    // 3 - Cliquer sur un lien...
    // await page.click(
    //     "#root > div > header > nav > ul > li:nth-child(1) > a"
    // )
    //
    // await page.waitFor(1000)

    // 3 - Cliquer sur un lien...
    await page.click(
        "#root > div > main > article > div:nth-child(3) > section > section:nth-child(2) > div > div > div > a"
    )
    await page.waitFor(1000) // fait une pause d'une seconde


    // 4 - Récupérer les données...
    const result = await page.evaluate(() => {
        let UrlImage1 = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > section > div > div.slick-slider.slick-initialized > div > div > div:nth-child(1) > div > div > div > img.image-image-Q9a.src-components-connected-productFullDetail-components-productImageCarouselZoom-productImageCarouselZoom__imageLoaded--317bK") ?
            document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > section > div > div.slick-slider.slick-initialized > div > div > div:nth-child(1) > div > div > div > img.image-image-Q9a.src-components-connected-productFullDetail-components-productImageCarouselZoom-productImageCarouselZoom__imageLoaded--317bK").src : "";
        let UrlImage2 = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > section > div > div.slick-slider.slick-initialized > div > div > div:nth-child(2) > div > div > div > img.image-image-Q9a.src-components-connected-productFullDetail-components-productImageCarouselZoom-productImageCarouselZoom__imageLoaded--317bK") ?
            document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > section > div > div.slick-slider.slick-initialized > div > div > div:nth-child(2) > div > div > div > img.image-image-Q9a.src-components-connected-productFullDetail-components-productImageCarouselZoom-productImageCarouselZoom__imageLoaded--317bK").src : "";
        let UrlImage3 = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > section > div > div.slick-slider.slick-initialized > div > div > div:nth-child(3) > div > div > div > img.image-image-Q9a.src-components-connected-productFullDetail-components-productImageCarouselZoom-productImageCarouselZoom__imageLoaded--317bK") ?
            document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > section > div > div.slick-slider.slick-initialized > div > div > div:nth-child(3) > div > div > div > img.image-image-Q9a.src-components-connected-productFullDetail-components-productImageCarouselZoom-productImageCarouselZoom__imageLoaded--317bK").src : "";
        let UrlImage4 = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > section > div > div.slick-slider.slick-initialized > div > div > div:nth-child(4) > div > div > div > img.image-image-Q9a.src-components-connected-productFullDetail-components-productImageCarouselZoom-productImageCarouselZoom__imageLoaded--317bK") ?
            document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > section > div > div.slick-slider.slick-initialized > div > div > div:nth-child(4) > div > div > div > img.image-image-Q9a.src-components-connected-productFullDetail-components-productImageCarouselZoom-productImageCarouselZoom__imageLoaded--317bK").src : "";
        let Brand = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > h2 > a").innerText
        let Name = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > h1 > span").innerText
        let BasePrice = parseFloat(document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div > div > span:nth-child(1)").innerText +
            document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div > div > span:nth-child(2)").innerText +
            document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div > div > span:nth-child(3)").innerText);
        let NetPrice = parseFloat(document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div > div:nth-child(2) > span:nth-child(1)").innerText +
            document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div > div:nth-child(2) > span:nth-child(2)").innerText +
            document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div > div:nth-child(2) > span:nth-child(3)").innerText);

        // let size = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div:nth-child(2) > div > div:nth-child(2)") ?
        //     document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div:nth-child(2) > div > div:nth-child(2)").innerText : ""

        let advice = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > div:nth-child(6)").innerText
        let marque = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(1) > span").innerText
        let Category = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(2) > span").innerText
        let NumMarque = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(3) > span").innerText
        let NumArticle = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(4) > span").innerText
        let Couleur = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(5) > span").innerText
        let Fermeture = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(6) > span").innerText
        let DoublureInterieur = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(7) > span").innerText
        let hauteurTalon = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(8) > span").innerText
        let type = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(9) > span").innerText
        let conseilTaille = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(10) > span").innerText

        
        return  {
            UrlImage1,
            UrlImage2,
            UrlImage3,
            UrlImage4,
            Brand,
            Name,
            BasePrice,
            NetPrice,
            advice,
            marque,
            Category,
            NumMarque,
            NumArticle,
            Couleur,
            Fermeture,
            DoublureInterieur,
            hauteurTalon,
            type,
            conseilTaille,
        };
    })

    // 5 - Retourner les données
    browser.close()
    return result
}

// Appel de la fonction getData() et affichage des données
getData().then(data => {

    let mutation = gql`
        mutation (
            $Name: String!,
            $UrlImage1: String,
            $UrlImage2: String,
            $UrlImage3: String,
            $UrlImage4: String,
            $Brand: String,
            $BasePrice: Float,
            $NetPrice: Float,
            $advice: String,
            $marque: String,
            $Category: String,
            $NumMarque: String,
            $NumArticle: String,
            $Couleur: String,
            $Fermeture: String,
            $DoublureInterieur: String,
            $hauteurTalon: String,
            $type: String,
            $conseilTaille: String,
        ){
            createChaussure(input: { data:
            {
                UrlImage1: $UrlImage1,
                UrlImage2: $UrlImage2,
                UrlImage3: $UrlImage3,
                UrlImage4: $UrlImage4,
                Brand: $Brand,
                Name: $Name
                BasePrice: $BasePrice,
                NetPrice: $NetPrice,
                advice: $advice
                marque: $marque
                Category: $Category
                NumMarque: $NumMarque
                NumArticle: $NumArticle
                Couleur: $Couleur
                Fermeture: $Fermeture,
                DoublureInterieur: $DoublureInterieur,
                hauteurTalon: $hauteurTalon,
                type: $type,
                conseilTaille: $conseilTaille
            }
            })
            {
                chaussure
                {
                    _id
                    UrlImage1
                    UrlImage2
                    UrlImage3
                    UrlImage4
                    Brand
                    Name
                    BasePrice
                    NetPrice
                    advice
                    marque
                    Category
                    NumMarque
                    NumArticle
                    Couleur
                    Fermeture
                    DoublureInterieur
                    hauteurTalon
                    type
                    conseilTaille
                }}
        }`;
    
    let variables = {
        "Name": `${data.Name}`,
        "UrlImage1": `${data.UrlImage1}`,
        "UrlImage2": `${data.UrlImage2}`,
        "UrlImage3": `${data.UrlImage3}`,
        "UrlImage4": `${data.UrlImage4}`,
        "Brand": `${data.Brand}`,
        "BasePrice": parseFloat(`${data.BasePrice}`),
        "NetPrice": parseFloat(`${parseFloat(data.NetPrice)}`),
        "advice": `${data.advice}`,
        "marque": `${data.marque}`,
        "Category": `${data.Category}`,
        "NumMarque": `${data.NumMarque}`,
        "NumArticle": `${data.NumArticle}`,
        "Couleur": `${data.Couleur}`,
        "Fermeture": `${data.Fermeture}`,
        "DoublureInterieur": `${data.DoublureInterieur}`,
        "hauteurTalon": `${data.hauteurTalon}`,
        "type": `${data.type}`,
        "conseilTaille": `${data.conseilTaille}`
    };

    request('http://localhost:1337/graphql', mutation, variables).then((response) => console.log(response));
})
