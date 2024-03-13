const { Router } = require("express");
const router = Router();
const matchesRouter = require("../routes/matches");

router.get("/", (req, res) => {
    res.send('hello fulbito api');
});

router.use('/matches', matchesRouter);

router.get('*', (req, res) => {
  res.status(404).send('esta pag no existe');
})

module.exports = router;