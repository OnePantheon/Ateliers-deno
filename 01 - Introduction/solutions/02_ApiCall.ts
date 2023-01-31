/**
 * Exemple 2 :
 * - Importez le module contenant l'endpoint et l'interface de l'API CatFact
 * - Faire appel à cette API avec fetch
 * - Ne rendre l'affichage du message que si l'utilisateur le souhaite
 */

// typescript et ES Module support out of the box
import {CAT_ENDPOINT, CatResponse} from "./catfact.ts";

// Les APIs web sont supportées :D
const request = await fetch(CAT_ENDPOINT);
const response: CatResponse = await request.json();
const message = response.fact;

const agreed: boolean = confirm("Voulez vous écouter un fait sur les chats ? ");
if (agreed) {
    console.log("\nVoici un fait sur les chats : ");
    console.log(">", message);
} else {
    console.log("\nBon temps pis...");
}
