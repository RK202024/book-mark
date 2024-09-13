const express = require('express');
const checkToken = require('../middleware/checkToken.js');
const Hoot = require('../models/hoot.js');
const router = express.Router();

// ========== Public Routes ===========

// ========= Protected Routes =========


//PoST
router.post('/', async (req, res) => {
    try {
        console.log(req.body)
      req.body.author = req.user._id;
      const hoot = await Hoot.create(req.body);
      hoot._doc.author = req.user;
      res.status(201).json(hoot);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

router.use(checkToken);

module.exports = router;