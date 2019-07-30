exports.MYSQL = {
    host: "127.0.0.1",
    username: "root",
    password: "",
    database: "test",
    use_database: true,
    debug: true 
}
exports.FACEBOOK = {
    clientID: "341879593426377",
    clientSecret: "ad7140424f866196d0cd5a999ef2b063",
    callbackURL: "http://localhost:8080/auth/facebook/callback",
}
exports.GOOGLEAUTH = {
    clientID : '909923212001-6682li1kqu99ot1f6stkkp6kec78gsga.apps.googleusercontent.com',
    clientSecret:'JYeDHAkkYY33is_tKKFEF6uO',
    callbackURL   : 'http://localhost:8080/auth/google/callback'
}

exports.LINKDIN = {
    clientID : '',
    clientSecret:'',
    callbackURL   : 'http://localhost:8080/auth/linkedin/callback'
}

exports.GIT_HUB = {
    clientID : '',
    clientSecret:'',
    callbackURL   : 'http://localhost:8080/auth/github/callback'
}

exports.PINTEREST = {
    clientID: '5046471369324279834',
    clientSecret: 'ce64372fbc0019261ec54880632d7d53e6e55d638b3ae826101783057fb25ea1',
    callbackURL: 'https://localhost:8080/auth/pinterest/callback'
}