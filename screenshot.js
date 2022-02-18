// Import du paquet "puppeteer"
const puppeteer = require('puppeteer')

// Déclaration d’une arrow function asynchrone *
const screenshot = async () => {

    // Création d’une instance de Chrome
    const browser = await puppeteer.launch()
    //const browser = await puppeteer.launch({ headless: false }) pour voir le navigateur s'ouvrir décommenter cette ligne et commenter la ligne du dessus

    // Création d’un nouvel onglet
    const page = await browser.newPage()

    // Navigation vers l'URL souhaitée
    await page.goto("https://www.eleganza-shop.com/fr")

    // Spécifier la taille de la fenêtre de navigation
    await page.setViewport({ width: 1000, height: 500 })

    // Screenshot de la page
    await page.screenshot({ path: "eleganza.png" })

    // Fermeture du navigateur
    await browser.close()
}

// Appel de la fonction principale
screenshot()