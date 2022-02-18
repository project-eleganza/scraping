import fetch from 'node-fetch';
import { batchRequests } from 'graphql-request';

const endpoint = 'http://localhost:1337/graphql'
//const websiteUrl = 'https://www.eleganza-shop.com/fr/chaussures-pour-enfants/baskets' - 11
//const websiteUrl = 'https://www.eleganza-shop.com/fr/chaussures-pour-enfants/chaussons' - 2
//const websiteUrl = 'https://www.eleganza-shop.com/fr/chaussures-pour-enfants/claquettes-et-sandales'
//const websiteUrl = 'https://www.eleganza-shop.com/fr/chaussures-pour-enfants/mocassins' - rien
//const websiteUrl = 'https://www.eleganza-shop.com/fr/chaussures-pour-enfants/chaussure-de-bebe' - rien
//const websiteUrl = 'https://www.eleganza-shop.com/fr/chaussures-femme/baskets?page=6'
//const websiteUrl = 'https://www.eleganza-shop.com/fr/chaussures-femme/mocassins-et-ballerines' - 5
//const websiteUrl = 'https://www.eleganza-shop.com/fr/chaussures-femme/escarpins-talons-hauts' - 1
//const websiteUrl = 'https://www.eleganza-shop.com/fr/chaussures-pour-enfants/baskets'
//const websiteUrl = 'https://www.eleganza-shop.com/fr/chaussures-femme/claquettes-et-sandales'
//const websiteUrl = 'https://www.eleganza-shop.com/fr/vetements-pour-femmes/t-shirts-tops'
//const websiteUrl = 'https://www.eleganza-shop.com/fr/vetements-pour-femmes/tailleurs-et-jacks'
//const websiteUrl = 'https://www.eleganza-shop.com/fr/vetements-pour-hommes/t-shirts-et-polos'
//const websiteUrl = 'https://www.eleganza-shop.com/fr/vetements-pour-femmes/vesten-truien'
//const websiteUrl = 'https://www.eleganza-shop.com/fr/vetements-pour-femmes/pantalons'
//const websiteUrl = 'https://www.eleganza-shop.com/fr/vetements-pour-femmes/jurken'
//const websiteUrl = 'https://www.eleganza-shop.com/fr/vetements-pour-hommes/t-shirts-et-polos?page=5'
//const websiteUrl = 'https://www.eleganza-shop.com/fr/vetements-pour-hommes/chemises?page=3'
const websiteUrl = 'https://www.eleganza-shop.com/fr/vetements-pour-hommes/sweats-pulls?page=3'



// 1 - Import de puppeteer
import puppeteer from 'puppeteer';

/*
// 2 - Récupération des URLs de toutes les pages à visiter
- waitFor("body"): met le script en pause le temps que la page se charge
- document.querySelectorAll(selector): renvoie tous les noeuds qui vérifient le selecteur
- [...document.querySelectorAll(selector)]: caste les réponses en tableau
- Array.map(link => link.href): récupère les attributs href de tous les liens
*/
const getAllUrl = async (browser) => {
    const page = await browser.newPage()
    await page.goto(websiteUrl)

    // Spécifier la taille de la fenêtre de navigation
    await page.setViewport({ width: 1600, height: 800 })

try{
    await page.click(
        "#CybotCookiebotDialogBodyButtonAccept"
    )
} catch {}
    await page.waitFor(1000)

    //await page.waitFor('body')
    const result = await page.evaluate(() =>
        [...document.querySelectorAll("#root > div > main > article > div:nth-child(3) > section > section:nth-child(2) > div > div > div > a")].map(link => link.href),
    )
    return result
}

// 3 - Récupération du prix et du tarif d'un livre à partir d'une url (voir exo #2)
const getDataFromUrl = async (page, url) => {

    await page.goto(url)
    await page.waitForSelector('body')
    // Spécifier la taille de la fenêtre de navigation
    await page.setViewport({ width: 1600, height: 800 })

    try{
        await page.click(
            "#CybotCookiebotDialogBodyButtonAccept"
        )
    } catch {}
    await page.waitFor(1000)

    // Clique sur le menu déroulant des tailles pour pouvoir récupérer les tailles dans la page
    // try{
    //     await page.click(
    //         "#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div:nth-child(2) > div > div > div"
    //     )
    // } catch{}


    return page.evaluate(() => {
        try {
            let att = [];
            att[0] = "";
            let sku = document.querySelector("#root > div > main > div:nth-child(1) > form > meta:nth-child(3)").content;
            let UrlImage1 = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > section > div > div.slick-slider.slick-initialized > div > div > div:nth-child(1) > div > div > div > img.image-image-Q9a.src-components-connected-productFullDetail-components-productImageCarouselZoom-productImageCarouselZoom__imageLoaded--317bK").src
            let UrlImage2 = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > section > div > div.slick-slider.slick-initialized > div > div > div:nth-child(2) > div > div > div > img.image-image-Q9a.src-components-connected-productFullDetail-components-productImageCarouselZoom-productImageCarouselZoom__imageLoaded--317bK").src
            let UrlImage3 = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > section > div > div.slick-slider.slick-initialized > div > div > div:nth-child(3) > div > div > div > img.image-image-Q9a.src-components-connected-productFullDetail-components-productImageCarouselZoom-productImageCarouselZoom__imageLoaded--317bK").src
            let UrlImage4 = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > section > div > div.slick-slider.slick-initialized > div > div > div:nth-child(4) > div > div > div > img.image-image-Q9a.src-components-connected-productFullDetail-components-productImageCarouselZoom-productImageCarouselZoom__imageLoaded--317bK").src
            let UrlImage5 = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > section > div > div.slick-slider.slick-initialized > div > div > div:nth-child(5) > div > div > div > img.image-image-Q9a.src-components-connected-productFullDetail-components-productImageCarouselZoom-productImageCarouselZoom__imageLoaded--317bK").src
            let UrlImage6 = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > section > div > div.slick-slider.slick-initialized > div > div > div:nth-child(6) > div > div > div > img.image-image-Q9a.src-components-connected-productFullDetail-components-productImageCarouselZoom-productImageCarouselZoom__imageLoaded--317bK").src
            let UrlImage7 = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > section > div > div.slick-slider.slick-initialized > div > div > div:nth-child(7) > div > div > div > img.image-image-Q9a.src-components-connected-productFullDetail-components-productImageCarouselZoom-productImageCarouselZoom__imageLoaded--317bK").src
            let UrlImage8 = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > section > div > div.slick-slider.slick-initialized > div > div > div:nth-child(8) > div > div > div > img.image-image-Q9a.src-components-connected-productFullDetail-components-productImageCarouselZoom-productImageCarouselZoom__imageLoaded--317bK").src
            let Brand = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > h2 > a").innerText
            let Name = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > h1 > span").innerText
            let sizeSelectors = document.querySelectorAll("#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div > button") ?
                document.querySelectorAll("#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div > button") : []
            let BasePrice = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div > div > span:nth-child(1)").innerText +
                document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div > div > span:nth-child(2)").innerText +
                document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div > div > span:nth-child(3)").innerText
            let NetPrice = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div > div:nth-child(2) > span:nth-child(1)") ?
                document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div > div:nth-child(2) > span:nth-child(1)").innerText +
                document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div > div:nth-child(2) > span:nth-child(2)").innerText +
                document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > div > div > div > div > div:nth-child(2) > span:nth-child(3)").innerText : "0.00"
            let advice = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section > div:nth-child(6)").innerText;
            att[1] = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(1) > span") ?
             document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(1) > span").innerText : ""
            att[2] = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(2) > span") ?
                document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(2) > span").innerText : ""
            att[3] = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(3) > span") ?
                 document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(3) > span").innerText : ""
            att[4] = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(4) > span") ?
                document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(4) > span").innerText : ""
            att[5] = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(5) > span") ?
                document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(5) > span").innerText : ""
            att[6] = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(6) > span") ?
                document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(6) > span").innerText : ""
            att[7] = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(7) > span") ?
                document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(7) > span").innerText : ""
            att[8] = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(8) > span") ?
                document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(8) > span").innerText : ""
            att[9] = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(9) > span") ?
                document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(9) > span").innerText : ""
            att[10] = document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(10) > span") ?
                document.querySelector("#root > div > main > div:nth-child(1) > form > div > div > div > section:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > ul > li:nth-child(10) > span").innerText : ""

            let size = []
            for (const sizeSel of sizeSelectors) {
                size.push(sizeSel.title)
            }

            return  {
                sku,
                UrlImage1,
                UrlImage2,
                UrlImage3,
                UrlImage4,
                UrlImage5,
                UrlImage6,
                UrlImage7,
                UrlImage8,
                Brand,
                Name,
                BasePrice,
                NetPrice,
                advice,
                size,
                att,
            };

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
        urlList.map(async (url) => {
            const page = await browser.newPage()
            const data = await getDataFromUrl(page, url);
            await page.goto(url);
            await page.close();
            return data;
        }),
        );
    browser.close()
    return results
}

const cleanValueAtt = (attribut) => {
    let myIndex = attribut ? attribut.indexOf(':')+1 : -1;
    return myIndex != -1 ? attribut.substr(myIndex).trim() : attribut;
}

const getAttributName = (attribut) => {
    let myIndex = attribut ? attribut.indexOf(':') : -1;
    return myIndex != -1 ? attribut.substr(0,myIndex).trim() : attribut;
}

const mapping = (data) => {
    console.log(data)
    for(let attribut of data.att) {
        let nameAtt  = getAttributName(attribut)
        console.log(nameAtt)
        let valueAtt = cleanValueAtt(attribut)
        console.log(valueAtt)

        switch (nameAtt) {
            case "Marque":
                data.marque = valueAtt;
                break;
            case "Catégories":
                data.Category = valueAtt;
                break;
            case "Numéro de marque":
                data.NumMarque = valueAtt;
                break;
            case "Numéro d'article":
                data.NumArticle = valueAtt;
                break;
            case "Couleur":
                data.Couleur = valueAtt;
                break;
            case "Fermeture":
                data.Fermeture = valueAtt;
                break;
            case "Doublure intérieure":
                data.DoublureInterieur = valueAtt;
                break;
            case "Hauteur du talon":
                data.hauteurTalon = valueAtt;
                break;
            case "Type de baskets":
                data.type = valueAtt;
                break;
            case "Conseils de taille":
                data.conseilTaille = valueAtt;
                break;
        }
        console.log(data)
    }
    delete data.att;
    console.log(data)
    return data;
}

    // 5 - Appel la fonction `scrap()`, affichage les résulats et catch les erreurs
    scrap()
        .then(async (datas) => {
            try {
                let requests = [];

                let mutationChaussure = `
                    mutation (
                        $sku: String!,
                        $Name: String!,
                        $UrlImage1: String,
                        $UrlImage2: String,
                        $UrlImage3: String,
                        $UrlImage4: String,
                        $UrlImage5: String,
                        $UrlImage6: String,
                        $UrlImage7: String,
                        $UrlImage8: String,
                        $Brand: String,
                        $BasePrice: Float,
                        $NetPrice: Float,
                        $advice: String,
                        $size: JSON,
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
                            sku: $sku,
                            UrlImage1: $UrlImage1,
                            UrlImage2: $UrlImage2,
                            UrlImage3: $UrlImage3,
                            UrlImage4: $UrlImage4,
                            UrlImage5: $UrlImage5,
                            UrlImage6: $UrlImage6,
                            UrlImage7: $UrlImage7,
                            UrlImage8: $UrlImage8,
                            Brand: $Brand,
                            Name: $Name
                            BasePrice: $BasePrice,
                            NetPrice: $NetPrice,
                            advice: $advice,
                            size: $size,
                            marque: $marque,
                            Category: $Category,
                            NumMarque: $NumMarque,
                            NumArticle: $NumArticle,
                            Couleur: $Couleur,
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
                                sku
                                UrlImage1
                                UrlImage2
                                UrlImage3
                                UrlImage4
                                UrlImage5
                                UrlImage6
                                UrlImage7
                                UrlImage8
                                Brand
                                Name
                                BasePrice
                                NetPrice
                                advice
                                size
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

                let mutationVetement = `
                    mutation (
                        $sku: String!,
                        $Name: String!,
                        $UrlImage1: String,
                        $UrlImage2: String,
                        $UrlImage3: String,
                        $UrlImage4: String,
                        $UrlImage5: String,
                        $UrlImage6: String,
                        $UrlImage7: String,
                        $UrlImage8: String,
                        $Brand: String,
                        $BasePrice: Float,
                        $NetPrice: Float,
                        $advice: String,
                        $size: JSON,
                        $marque: String,
                        $Category: String,
                        $NumMarque: String,
                        $NumArticle: String,
                        $Couleur: String,
                        $Fermeture: String,
                        $conseilTaille: String,
                    ){
                        createVetement(input: { data:
                        {
                            sku: $sku,
                            UrlImage1: $UrlImage1,
                            UrlImage2: $UrlImage2,
                            UrlImage3: $UrlImage3,
                            UrlImage4: $UrlImage4,
                            UrlImage5: $UrlImage5,
                            UrlImage6: $UrlImage6,
                            UrlImage7: $UrlImage7,
                            UrlImage8: $UrlImage8,
                            Brand: $Brand,
                            Name: $Name
                            BasePrice: $BasePrice,
                            NetPrice: $NetPrice,
                            advice: $advice
                            size: $size
                            marque: $marque
                            Category: $Category
                            NumMarque: $NumMarque
                            NumArticle: $NumArticle
                            Couleur: $Couleur
                            Fermeture: $Fermeture,
                            conseilTaille: $conseilTaille
                        }
                        })
                        {
                            vetement
                            {
                                _id
                                sku
                                UrlImage1
                                UrlImage2
                                UrlImage3
                                UrlImage4
                                UrlImage5
                                UrlImage6
                                UrlImage7
                                UrlImage8
                                Brand
                                Name
                                BasePrice
                                NetPrice
                                advice
                                size
                                marque
                                Category
                                NumMarque
                                NumArticle
                                Couleur
                                Fermeture
                                conseilTaille
                            }}
                    }`;

                for (let data of datas) {
                    if (data.sku !== undefined) {
                      data = mapping(data)

                        let variables = {
                            "sku": `${data.sku}`,
                            "Name": `${data.Name}`,
                            "UrlImage1": `${data.UrlImage1}`,
                            "UrlImage2": `${data.UrlImage2}`,
                            "UrlImage3": `${data.UrlImage3}`,
                            "UrlImage4": `${data.UrlImage4}`,
                            "UrlImage5": `${data.UrlImage5}`,
                            "UrlImage6": `${data.UrlImage6}`,
                            "UrlImage7": `${data.UrlImage7}`,
                            "UrlImage8": `${data.UrlImage8}`,
                            "Brand": `${data.Brand}`,
                            "BasePrice": parseFloat(`${data.BasePrice}`),
                            "NetPrice": parseFloat(`${parseFloat(data.NetPrice)}`),
                            "advice": `${data.advice}`,
                            "size": JSON.stringify(data.size),
                            "marque": `${data.marque ? data.marque : ""}`,
                            "Category": `${data.Category ? data.Category : ""}`,
                            "NumMarque": `${data.NumMarque ? data.NumMarque : ""}`,
                            "NumArticle": `${data.NumArticle ? data.NumArticle : ""}`,
                            "Couleur": `${data.Couleur ? data.Couleur : ""}`,
                            "Fermeture": `${data.Fermeture ? data.Fermeture : ""}`,
                            "DoublureInterieur": `${data.DoublureInterieur ? data.DoublureInterieur : ""}`,
                            "hauteurTalon": `${data.hauteurTalon ? data.hauteurTalon : ""}`,
                            "type": `${data.type ? data.type : ""}`,
                            "conseilTaille": `${data.conseilTaille ? data.conseilTaille : ""}`
                        };
                        requests.push({document: data.hauteurTalon ? mutationChaussure : mutationVetement, variables: variables});
                    }
                    console.log(requests.variables);
                    console.log("nb products add : ", requests.length);

                    const response = await batchRequests(endpoint, requests);
                }
            } catch (error) {
                console.log(`error: ${error}`)
            }
        })
        .catch(e => console.log(`error: ${e}`))