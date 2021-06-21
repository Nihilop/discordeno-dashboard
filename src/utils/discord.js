const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2({ version: 'v9' });
const settings = require('../../settings.json')

export async function connectToDiscord(arg) {
  
  const response = await oauth.tokenRequest({
    clientId: settings.client_id,
    clientSecret: settings.secret,

    code: arg,
    scope: "identify guilds",
    grantType: "authorization_code",
    
    redirectUri: settings.redirectUri,
  })

  return response
}

export async function getDiscordUser(arg) {
  const response = await oauth.getUser(arg);
  return response;
}

export async function getDiscordGuilds(arg) {
  const response = await oauth.getUserGuilds(arg);
  return response;
}
