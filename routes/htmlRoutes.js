const path = require('path')
const router = require('express').Router()

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

// Export module
module.exports = router;