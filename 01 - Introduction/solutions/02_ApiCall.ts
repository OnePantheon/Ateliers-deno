/**
 * Exemple 2 :
 * - Voici une API très sympa faite par bibi : https://ifuckinghatejira.deno.dev/
 * - Faire appel à cette API
 * - Ne rendre l'affichage du message que si l'utilisateur n'aime pas Jira.
 */

// Les APIs web sont supportées :D
const request = await fetch("https://ifuckinghatejira.deno.dev/");
const message = await request.text();

const result: boolean = confirm("Aimez-vous jira ? ");
if (! result) {
    console.log("\nVoici une opinion honnête sur jira : ");
    console.log(message);
} else {
    console.log("\nVous aimez jira ? Mieux vaut ne pas dire la vérité.");
}
