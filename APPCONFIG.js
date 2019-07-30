exports.MYSQL = {
    host: "127.0.0.1",
    username: "root",
    password: "",
    database: "test",
    use_database: true,
    debug: true 
}
exports.FACEBOOK = {
    clientID: "<clientID>",
    clientSecret: "<clientSecret>",
    callbackURL: "http://localhost:8080/auth/facebook/callback",
}
exports.GOOGLEAUTH = {
    clientID : '<clientID>',
    clientSecret:'<clientSecret>',
    callbackURL   : 'http://localhost:8080/auth/google/callback'
}

exports.LINKDIN = {
    clientID : '<clientID>',
    clientSecret:'<clientSecret>',
    callbackURL   : 'http://localhost:8080/auth/linkedin/callback'
}

exports.GIT_HUB = {
    clientID : '<clientID>',
    clientSecret:'<clientSecret>',
    callbackURL   : 'http://localhost:8080/auth/github/callback'
}

exports.PINTEREST = {
    clientID: '<clientID>',
    clientSecret: '<clientSecret>',
    callbackURL: 'https://localhost:8080/auth/pinterest/callback'
}