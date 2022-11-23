const endpoint = "https://discord.com/api/v10/";

export async function authCodeToAccessToken(code: string) {
    const params = {
        client_id: Deno.env.get("CLIENT_ID") ?? "",
        client_secret: Deno.env.get("CLIENT_SECRET") ?? "",
        redirect_uri: Deno.env.get("REDIRECT_URI") ?? "",
        grant_type: "authorization_code",
        code
    };  
    const request = await fetch(endpoint + "/oauth2/token", {
        method: "POST",
        body: new URLSearchParams(params).toString(),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
    if (request.status != 200) {
        throw new Error("Code invalide.");
    }
    const result = await request.json();
    return result.access_token;
}

export async function getGuilds(token: string) {
    const request = await fetch(endpoint + "/users/@me/guilds", {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    if (request.status != 200) {
        throw new Error("Token invalide.");
    }
    return await request.json();
}