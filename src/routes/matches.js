const { Router } = require("express");
const router = Router();
const match = require("../controllers/match");

router.get('/', match.getAllMatches);
router.get('/:id', match.getMatch);
router.post('/', match.createMatch);
router.patch('/:id', match.updateMatch);
router.patch('/:id/player/:playerId', match.updateMatchPlayer);
router.delete('/:id', match.destroyMatch);

module.exports = router;