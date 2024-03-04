const { Router } = require("express");
const router = Router();
const cors = require("cors");
// const paymentsRouter = require("../routes/payments");

router.use(cors());
router.get("/", (req, res) => {
    res.send('hello fulbito api');
});

// router.use('/payment', paymentsRouter);

router.get('*', (req, res) => {
  res.status(404).send('esta pag no existe');
})

module.exports = router;