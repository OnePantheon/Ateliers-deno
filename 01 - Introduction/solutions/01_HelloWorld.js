/**
 * Exemple 1 :
 * Etape 1 : Faire un programme qui affiche "Hello World".
 * Etape 2 : Faire un programme qui affiche le contenu du fichier "canard.txt"
 */

console.log("Hello World !");

// support du top level await
// ... et aussi un système de permissions vraiment bien foutu.
// avant ça faisait un throw, mais depuis la version 1.28, ça a changé
const texte = await Deno.readTextFile("canard.txt");

console.log(texte);

