/*
 * GET home page.
 */
var crypto = require('crypto');
var User = require('../models/user.js');
var index = function (req, res) {
    res.render('index', {title: 'Express'})
};
var user = function (req, res) {
    res.send('user:' + req.params.username);
};
var post = function (req, res) {
    res.render('list', {
        title: 'list',
        items: [
            1991,
            'zly',
            'express',
            'node.js',
        ]

    })
};
var reg = function (req, res) {
    res.render('reg', {
        title: 'reg',
    })
};
var doReg = function (req, res) {
    console.log(req.body);
    if (req.body['passwordRepeat'] != req.body['password']) {
        return res.send('口令不一致')
    }
    // 生成口令的散列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    var newUser = new User({
        name: req.body.username,
        password: password,
    });

    // 检查用户名是否存在
    User.get(newUser.name, function (err, user) {
        if (user) {
            err = 'username already exists';
        }
        if (err) {
           return res.send(err);
        }

        // 如果不存在则增加新用户
        newUser.save(function(err) {
            if (err) {
                return res.send(err)
            }
            req.session.user = newUser;
            res.send('注册成功')
        });
    });
};
var login = function (req, res) {

};
var doLogin = function (req, res) {

};
var logout = function (req, res) {

};
module.exports = function (app) {
    app.get('/', index);
    app.get('/user', user);
    app.post('/post', post);
    app.get('/reg', reg);
    app.post('/reg', doReg);
    app.get('/login', login);
    app.post('/login', doLogin);
    app.get('/logout', logout);
};
