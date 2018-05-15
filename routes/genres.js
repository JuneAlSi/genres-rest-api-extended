const Joi = require('joi')
const express = require('express')
const router = express.Router()

const genres = [{
    id: 1,
    name: 'Action'
  },
  {
    id: 2,
    name: 'Horror'
  },
  {
    id: 3,
    name: 'Romance'
  }
]

// home(all genres)
router.get('/', (reg, res) => {
  res.send(genres)
})

// get single genre
router.get('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('The genre does not exist.')
  res.send(genre)
})

// add a genre
router.post('/', (req, res) => {
  const {
    error
  } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  }
  genres.push(genre)
  res.send(genres)
})

// change a genre
router.put('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('The genre does not exist.')

  const {
    error
  } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  genre.name = req.body.name
  res.send(genres)
})

// delete a genre
router.delete('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('The genre does not exist.')

  const index = genres.indexOf(genre)
  genres.splice(index, 1)
  res.send(genres)
})

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  }
  return Joi.validate(genre, schema)
}

module.exports = router;