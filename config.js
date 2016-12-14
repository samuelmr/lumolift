var authUrl = 'https://api.lumobodytech.com/oauth2'
var baseUrl = 'https://api.lumobodytech.com/v1'
module.exports = {
  authUrl: authUrl,
  baseUrl: baseUrl,
  accessTokenUri: authUrl + '/token/',
  authorizationUri: authUrl + '/authorize/',
  authorizationGrants: ['credentials'],
  scopes: ['read_activity', 'read_profile']
}
