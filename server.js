const express = require('express')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const path = require('path')
const cors = require('cors')
const toyService = require('./service/toyService(BE).js');
const app = express()

app.use(cors());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// Get list of toys
// TODOS: take care of type + instock filter + sort order
app.get('/toys', (req, res) => {

    toyService.query()
        .then(toys => {
            if (req.query.inStock) toys = toys.filter(toy => toy.inStock);
            if (req.query.name) {
                toys = toys.filter(toy => {
                    if (toy.name.toLowerCase().includes(req.query.name.toLowerCase())) return toy;
                });
            }
            if (req.query.type) {
                toys = toys.filter(toy => {
                    if (toy.type.toLowerCase().includes(req.query.type.toLowerCase())) return toy;
                })
            }
            if (req.query.sort) {
                const { sort } = req.query
                if (req.query.order === 'asc') toys = toys.sort((a, b) => a[sort] > b[sort])
                else toys = toys.sort((a, b) => a[sort] < b[sort])
            }
            return res.json(toys)
        })
})

// Get single toy
app.get('/toys/:toyId', (req, res) => {
    const toyId = +req.params.toyId
    toyService.getToyById(toyId)
        .then(toy => res.json(toy))
        .catch(toy => res.json(toy))
})