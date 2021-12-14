const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const cors = require('cors');
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE", "PUT"]
}
router.use(cors(corsOptions));

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", (req, res, next) => {
  const type = req.query.type; //구매 또는 취소
  console.log(req.body.category)

  // //구매하기
  if ('buy' === type) {
    try {
      const dbconnect_Module = require("./dbconnect_module");
      req.body.mapper = "Mapper"; // mybatis xml 파일명
      req.body.crud = "insert"; // select, insert, update, delete 중 선택
      req.body.mapper_id = "insertProduct"; //실행할 구문 id 입력

      router.use("/", dbconnect_Module);
      next("route");
    } catch(error) {
      console.log(error)
    }
  } else if('delete' === type){
    try {
      const dbconnect_Module = require("./dbconnect_module");
      req.body.mapper = "Mapper"; // mybatis xml 파일명
      req.body.crud = "delete"; // select, insert, update, delete 중 선택
      req.body.mapper_id = "deleteProductBought"; //실행할 구문 id 입력

      router.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log(error)
    }
  }
  else if ('totalamount' === type){
    try {
      const dbconnect_Module = require("./dbconnect_module");
      req.body.mapper = "Mapper"; // mybatis xml 파일명
      req.body.crud = "select"; // select, insert, update, delete 중 선택
      req.body.mapper_id = "totalProductBought"; //실행할 구문 id 입력

      router.use("/", dbconnect_Module);
      next("route");
    } catch(error) {
      console.log(error)
    }
  } else if ('categoryItem' === type){
    try {
      const dbconnect_Module = require("./dbconnect_module");
      req.body.mapper = "Mapper"; // mybatis xml 파일명
      req.body.crud = "select"; // select, insert, update, delete 중 선택
      req.body.mapper_id = "categoryItemBought"; //실행할 구문 id 입력

      router.use("/", dbconnect_Module);
      next("route");
    } catch(error) {
      console.log(error)
    }
  }
})

// 안됐던 내용
// 1. axios.get("http://localhost:5001/purchase/totalamount") 처럼 작성해서 실행
// 2. try{  } 문 안까지는 실행이 됨
// 3. 그러나 404에러 발생
// router.use("/", dbconnect_Module) 는 가져온 dbconnect_module 파일로 넘어가서 "/" 를 실행하는게 아닌가?
// 왜 넘어가서 실행되지가 않지?

// router.get("/totalamount", (req, res, next) => {
//     try {
//       const dbconnect_Module = require("./dbconnect_module");
//       req.body.mapper = "Mapper"; // mybatis xml 파일명
//       req.body.crud = "select"; // select, insert, update, delete 중 선택
//       req.body.mapper_id = "totalProductBought"; //실행할 구문 id 입력
      
//       router.use("/", dbconnect_Module);

//       next("route");
//     } catch(error) {
//       console.log('에러남')
//       console.log('문제있음', error)
//     }
// })

module.exports = router;
