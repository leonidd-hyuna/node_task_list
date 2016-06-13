var express = require('express');
var router = express.Router();
var models = require('../server/models');

/* GET home page. */
router.get('', function(req, res, next) {
  res.render('index', { title: 'Task List' });
});

router.post('/users', function(req, res) {
    models.User.create({
        email: req.body.email
    }).then(function(user) {
        res.json(user);
    });
});

router.get('/todos', function(req, res) {
    models.Todo.findAll({}).then(function(todos) {
        res.json(todos);
    });
})
    .get('/todo/:id', function(req, res) {
        models.Todo.find({
            where: {
                id: req.params.id
            }
        })
            .then(function (todo) {
                res.json(todo);
            });
    })
    .post('/todos', function (req, res) {
        models.Todo.create({
            title: req.body.title,
            UserId: req.body.user_id
        })
            .then(function (todo) {
                res.json(todo);
            });
    })
    .put('/todo/:id', function (req, res) {
        models.Todo.find({
            where: {
                id: req.params.id
            }
        })
        .then(function(todo) {
            if(todo) {
                //var datas = [];
                //req.body
                //    for (req.body)
                //    .forEach ( function(row) {
                //    push(datas, row);
                //    return datas;
                //});
                return todo.updateAttributes({
                    title: req.body.title,
                    complete: req.body.complete
                });
            }

        })
        .then(function(todo) {
            res.send(todo);
        })
        .catch(function (err) {
            console.log(err);
            res.send(err)
        });
    });


module.exports = router;
