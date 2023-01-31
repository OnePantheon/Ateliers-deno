/**
 * Exemple 3 (le plus gros)
 * - Importer la librairie Aqua (https://deno.land/x/aqua@v1.3.5/mod.ts) et faire un hello world
 * - Importer une librairie NPM (npm:qrcode@1.5.1) et afficher un QR Code
 * - Utiliser un import map dans le fichier deno.json
 */
import Aqua from "aqua";
import QRCode from "qrcode";

console.log("Démarrage du serveur...");

const aqua = new Aqua(3001);
aqua.get("/", async ()=> {
    const url = await QRCode.toDataURL('https://soup.kagescan.fr');
    return `
        <H1>Hello world</H1>
        <p>Un super site : <br>
            <img src="${url}" />
        </p>
    `;
});

console.log("Serveur web démarré sur http://localhost:3001");

