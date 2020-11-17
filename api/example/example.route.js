const express = require("express");
const router = express.Router();



/**
 * @swagger
 * /:
 *  get:
 *    description: GET the data from the root 
 *   
 *    produces:
 *      - application/json
 *
 *    responses:
 *      '200':
 *        description: A succesful response
 */
router.get('/', (req, res) => {
  res.send('NODE JS PROJECT TEMPLATE')
})









module.exports = router;
