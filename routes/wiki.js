var express = require('express');
var router = express.Router();
var request = require("request");

/* GET users listing. */
router.get('/search/:query', function (req, res) {
    request({
        uri: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + req.params.query,
        method: "GET"
    }, function (error, response, body) {
        res.json(JSON.parse(response.body));
    });
});

router.get('/topic/:title', function (req, res) {
    request({
        uri: "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=" + req.params.title,
        method: "GET"
    }, function (error, response, body) {
        res.json(JSON.parse(response.body));
    });
});


module.exports = router;
