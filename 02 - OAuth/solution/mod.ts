// dépendances
import Aqua from "https://deno.land/x/aqua@v1.3.5/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

// importations
import {authCodeToAccessToken, getGuilds} from "./discordUtils.ts";

// chargement du fichier .env
config({export: true});


// vu qu'on a pas de système de cookie, autant faire comme ça :
const globalStorage = {
    token: null
};


const aqua = new Aqua(3001);
aqua.get("/", async ()=> {
    if (!globalStorage.token) {
        return `
            <h1>Vous n'êtes pas connecté.</h1>
            <a href="https://discord.com/api/oauth2/authorize?client_id=979449766196961310&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fsignin-discord&response_type=code&scope=identify%20guilds">
                Cliquez ici pour démarrer
            </a>
        `;
    }
    try {
        const guilds = await getGuilds(globalStorage.token);
        return `
            <h1>Nombre de serveurs : ${guilds.length}</h1>
            <ul>
            ${
                guilds.map((guild: Record<string, string>) => `
                    <li>
                        <img src="https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png" width="30" height="30"> :
                        ${guild.name}
                    </li>
                `).join("")
            }
            </ul>
        `;
    } catch (e) {
        return `
            <h1>Impossible de récupérer vos serveurs</h1>
            <p>
                Le token a peut-être expiré ?
                Raison : ${e}
            </p> 
        `
    }
}); 

aqua.get("/signin-discord", async (req) => {
    try {
        const code = req.query.code;
        globalStorage.token = await authCodeToAccessToken(code);
        
        return `
            <h1>Authentification réussie</h1>
            <a href="/">
                Cliquez ici pour accéder au site.
            </a>
        `;
    } catch (e) {
        globalStorage.token = null;
        return `
            <h1>Authentification échouée.</h1>
            <p>Raison : ${e}</p>
            <a href="/">
                Cliquez ici pour revenir au menu.
            </a>
        `
    }
});

console.log("Serveur démarré.");
