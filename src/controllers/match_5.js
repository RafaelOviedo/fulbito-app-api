const Matches = require('../models/Match_5');
const cloudinary = require('cloudinary').v2;

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
    const { id, playerId } = req.params;
    const match = await Matches.findOne({ _id: id });
    let player = match.players.find((player) => player._id.toString() === playerId);

    cloudinary.uploader.upload_stream({ resource_type: "raw" }, async (error, result) => {
      if (error) {
          console.error('Error uploading to Cloudinary:', error);
          return res.status(500).send({ error: 'Error uploading image to Cloudinary' });
      }
      
      const data = {
        name: player.name,
        payment: true,
        voucher: result.secure_url,
      };

      Object.assign(player, data);

      await match.save();
      res.status(204).send(match);

    }).end(req.file.buffer);
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