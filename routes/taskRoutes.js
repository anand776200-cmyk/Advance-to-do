const express = require("express");
const router = express.Router();

router.get('/add', (req, res) => {
    // return res.render('newList')
    return alert('working');
})

module.exports = router;