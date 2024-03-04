const { Router } = require("express");
const router = Router();
const cors = require("cors");
const matchesRouter = require("../routes/matches");

router.use(cors());
router.get("/", (req, res) => {
    res.send('hello fulbito api');
});

router.use('/matches', matchesRouter);

router.get('*', (req, res) => {
  res.status(404).send('esta pag no existe');
})

module.exports = router;