const Matches = require('../models/Match');

const Match = {
  getAllMatches: async (req, res) => {
    const matches = await Matches.find()
    res.status(200).send(matches);
  },

  getMatch: async (req, res) => {
    const { id } = req.params
    const match = await Matches.findOne({ _id: id })
    res.status(200).send(match);
  },

  createMatch: async (req, res) => {
    const match = new Matches(req.body)
    const savedMatch = await match.save()
    res.status(201).send(savedMatch);
  },

  updateMatch: async (req, res) => {
    const { id } = req.params
    const match = await Matches.findOne({ _id: id })
    Object.assign(match, req.body)
    await match.save()
    res.status(204).send(match);
  },

  createMatchPlayer: async (req, res) => {
    const { id } = req.params;
    const match = await Matches.findOne({ _id: id })
    const players = match.players;
    players.push(req.body);
    await match.save()
    res.status(201).send(match);
  },

  updateMatchPlayer: async (req, res) => {
    const { id, playerId } = req.params
    const match = await Matches.findOne({ _id: id })
    const player = match.players.find((player) => player._id.toString() === playerId)
    Object.assign(player, req.body)
    await match.save()
    res.status(204).send(match);
  },

  destroyMatch: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Matches.deleteOne({ _id: id });
  
      if (result.deletedCount === 1) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ error: 'Match not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  destroyMatchPlayer: async (req, res) => {
    const { id, playerId } = req.params;
    const match = await Matches.findOne({ _id: id })

    // return the list of players without the one you're looking to delete
    match.players = match.players.filter((player) => player._id.toString() !== playerId)
    await match.save()
    res.status(204).send(match);
  }
}

module.exports = Match;