const { Router } = require("express");
const router = Router();
const match = require("../controllers/match");

router.get('/', match.getAllMatches);
router.get('/:id', match.getMatch);

router.post('/', match.createMatch);
router.post('/:id', match.createMatchPlayer);

router.patch('/:id', match.updateMatch);
router.patch('/:id/player/:playerId', match.updateMatchPlayer);

router.delete('/:id', match.destroyMatch);
router.delete('/:id/player/:playerId', match.destroyMatchPlayer);

module.exports = router;