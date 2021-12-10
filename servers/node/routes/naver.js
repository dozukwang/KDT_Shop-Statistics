const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
require('dotenv').config()

const cors = require('cors');
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE", "PUT"]
}
router.use(cors(corsOptions));

// localhost:5001/board?key=1&key2=value2&key3=value3
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

// 네이버 API 요청 위한 모듈
const request = require('request')

const client_id = process.env.NAVER_CLIENT_ID;
const client_secret = process.env.NAVER_CLIENT_SECRET;

// 쇼핑 검색 API
// /search
router.get('/search', function (req, res, next) {
  try{
   var api_url = 'https://openapi.naver.com/v1/search/shop.json?query=' + encodeURI(req.query.query);
   
   console.log(api_url)

   var options = {
       url: api_url,
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
   //네이버 응답
   request.get(options, function (error, response, body) {
     if (!error && response.statusCode === 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
  } catch (error) {
    console.log("Module > dbconnect error: ", error);
  }
});

router.get('/autoKeyword', function (req, res, next) {
  try{
   const keyword = req.query.keyword
   var api_url = 'https://mac.search.naver.com/mobile/ac?_q_enc=UTF-8&st=1&r_format=json&q=' + encodeURI(keyword);

  //  자동완성 요청
   request.get(api_url, function (error, response, body) {
     if (!error && response.statusCode === 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
  } catch (error) {
    console.log("Module > dbconnect error: ", error);
  }
});


module.exports = router;
