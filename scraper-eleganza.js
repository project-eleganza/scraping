import fetch from 'node-fetch';
import { request, gql } from 'graphql-request'


const apiUrl = 'http://localhost:1337'
const websiteUrl = 'https://www.eleganza-shop.com/fr/enfants/'

// 1 - Import de puppeteer
import puppeteer from 'puppeteer';

/*
// 2 - Récupération des URLs de toutes les pages à visiter
- waitFor("body"): met le script en pause le temps que la page se charge
- document.querySelectorAll(selector): renvoie tous les noeuds qui vérifient le selecteur
- [...document.querySelectorAll(selector)]: caste les réponses en tableau
- Array.map(link => link.href): récupère les attributs href de tous les liens
*/
const getAllUrl = async browser => {
    const page = await browser.newPage()
    await page.goto(websiteUrl)

    // Spécifier la taille de la fenêtre de navigation
    await page.setViewport({ width: 1600, height: 800 })

try{
    await page.click(
        "#CybotCookiebotDialogBodyButtonAccept"
    )
} catch {}

    //await page.waitFor('body')
    const result = await page.evaluate(() =>
        [...document.querySelectorAll("#root > div > main > article > div:nth-child(3) > section > section:nth-child(2) > div > div > div > a")].map(link => link.href),
    )
    return result
}


// 3 - Récupération du prix et du tarif d'un livre à partir d'une url (voir exo #2)
const getDataFromUrl = async (browser, url) => {
    const page = await browser.newPage()
    await page.goto(url)
    await page.waitForSelector('body')
    // Spécifier la taille de la fenêtre de navigation
    await page.setViewport({ width: 1600, height: 800 })

    try{
        await page.click(
            "#CybotCookiebotDialogBodyButtonAccept"
        )
    } catch {}

    // try{
    //     await page.click(
    //         "#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div:nth-child(2) > div > div > div"
    //     )
    // } catch{}


    return page.evaluate(() => {
        try {
            let UrlImage1 = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > section > div > div.slick-slider.slick-initialized > div > div > div:nth-child(1) > div > div > div > img.image-image-Q9a.src-components-connected-productFullDetail-components-productImageCarouselZoom-productImageCarouselZoom__imageLoaded--317bK").src
            let UrlImage2 = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > section > div > div.slick-slider.slick-initialized > div > div > div:nth-child(2) > div > div > div > img.image-image-Q9a.src-components-connected-productFullDetail-components-productImageCarouselZoom-productImageCarouselZoom__imageLoaded--317bK").src
            let UrlImage3 = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > section > div > div.slick-slider.slick-initialized > div > div > div:nth-child(3) > div > div > div > img.image-image-Q9a.src-components-connected-productFullDetail-components-productImageCarouselZoom-productImageCarouselZoom__imageLoaded--317bK").src
            let UrlImage4 = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > section > div > div.slick-slider.slick-initialized > div > div > div:nth-child(4) > div > div > div > img.image-image-Q9a.src-components-connected-productFullDetail-components-productImageCarouselZoom-productImageCarouselZoom__imageLoaded--317bK").src
            let Brand = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > h2 > a").innerText
            let Name = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > h1 > span").innerText
            let BasePrice = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div > div > span:nth-child(1)").innerText +
                document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div > div > span:nth-child(2)").innerText +
                document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div > div > span:nth-child(3)").innerText
            let NetPrice = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div > div:nth-child(2) > span:nth-child(1)").innerText +
                document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div > div:nth-child(2) > span:nth-child(2)").innerText +
                document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div > div:nth-child(2) > span:nth-child(3)").innerText

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

            let mutation = gql`
                mutation
                (
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
                )
                {
                    createChaussure(input: { data:
                    {
                        UrlImage1: $UrlImage1,
                        UrlImage2: $UrlImage2,
                        UrlImage3: $UrlImage3,
                        UrlImage4: $UrlImage4,
                        Brand: $Brand,
                        Name: $Name,
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

            return {mutation, variables};
        } catch(error) {
            return {error};
        }

    })
}

/*
// 4 - Fonction principale : instanciation d'un navigateur et renvoi des résultats
- urlList.map(url => getDataFromUrl(browser, url)):
appelle la fonction getDataFromUrl sur chaque URL de `urlList` et renvoi un tableau

- await Promise.all(promesse1, promesse2, promesse3):
bloque de programme tant que toutes les promesses ne sont pas résolues
*/
const scrap = async () => {
    const browser = await puppeteer.launch({ headless: false })
    const urlList = await getAllUrl(browser)
    const results = await Promise.all(
        urlList.map(url => getDataFromUrl(browser, url)),
    )
    console.log(results)
    browser.close()
    return results
}


// 5 - Appel la fonction `scrap()`, affichage les résulats et catch les erreurs
 scrap()
    .then(async (datas) =>  {
     const results = await Promise.all(
         datas.map(data => {
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

    }))
}).catch(e => console.log(`error: ${e}`))

