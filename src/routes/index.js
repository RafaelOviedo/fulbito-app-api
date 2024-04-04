const { Router } = require("express");
const router = Router();
const matches8Router = require("./matches_8");
const matches5Router = require("./matches_5");

router.get("/", (req, res) => {
    res.send('hello fulbito api');
});

router.use('/matches_8', matches8Router);
router.use('/matches_5', matches5Router);

router.get('*', (req, res) => {
  res.status(404).send('esta pag no existe');
})

module.exports = router;