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
  // const item = req.body //보낸 item정보 객체
  const type = req.query.type; //구매 또는 취소
  // //구매하기
  if ('buy' === type) {
    try{
      const dbconnect_Module = require("./dbconnect_module");
      req.body.mapper = "Mapper"; // mybatis xml 파일명
      req.body.crud = "insert"; // select, insert, update, delete 중 선택
      req.body.mapper_id = "insertProduct"; //실행할 구문 id 입력

      router.use("/", dbconnect_Module);
      next("route");
    } catch(error) {
      console.log(error)
    }
  }
  // //구매 수량 취소하기
  // else if ('cancle' === type) {
  //   try{
  //     const dbconnect_Module = require("./dbconnect_module");
  //     req.body.mapper = "Mapper"; // mybatis xml 파일명
  //     req.body.crud = "select"; // select, insert, update, delete 중 선택
  //     req.body.mapper_id = "deleteProducts"; //실행할 구문 id 입력

  //     router.use("/", dbconnect_Module);
  //   } catch(error) {
  //     console.log(error)
  //   }
  // }
  // //구매 일괄 취소하기
  // else if ('cancle' === type) {
  //   try{
  //     const dbconnect_Module = require("./dbconnect_module");
  //     req.body.mapper = "Mapper"; // mybatis xml 파일명
  //     req.body.crud = "select"; // select, insert, update, delete 중 선택
  //     req.body.mapper_id = "deleteProducts"; //실행할 구문 id 입력

  //     router.use("/", dbconnect_Module);
  //   } catch(error) {
  //     console.log(error)
  //   }
  // }
})


module.exports = router;
