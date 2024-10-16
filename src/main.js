import { randomUUID } from 'crypto';
import express from 'express';

const app = express()

let objects = []
const emailRegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

app.use(express.json())

app.get('/status', (_req, res) => res.send('pong'))

app.get('/directories/:page/:perPage', (req, res) => {
    const { perPage: perStr, page: pageStr} = req.params
    const page = Number(pageStr)
    const perPage = Number(perStr)
    const prevPage = (page - 1) || 1
    const nextPage = (page + 1) * perPage > objects.length ? page : page + 1
    res.json({
        count: objects.length,
        next: req.get('host') + `/directories/${nextPage}/${perPage}`,
        previous: req.get('host') + `/directories/${prevPage}/${perPage}`,
        results: objects.slice(((page-1) * perPage), ((page) * perPage))
    })        
})

app.post('/directories', (req, res) => {
    const { name, email } = req.body
    if (!emailRegExp.test(email))
    return res.status(400).send('Bad email')
    if (!name)
    return res.status(400).send('Bad name')
    if (objects.some(e => e.email === email))
    return res.status(400).send('Bad email')
    const objectNew = {
        name, email, id: randomUUID()
    }
    objects.push(objectNew)
    res.json(objectNew)
})

app.get('/directories/:id', (req, res) => {
    const { id } = req.params
    const objectFound = objects.find(e => e.id === id)
    if (!objectFound)
    return res.status(404).send('Object not found')
    return res.json(objectFound)
})

app.put('/directories/:id', (req, res) => {
    const { id } = req.params
    const objectFound = objects.find(e => e.id === id)
    if (!objectFound)
    return res.status(404).send('Object not found')
    const { name, email } = req.body
    if (!emailRegExp.test(email))
    return res.status(400).send('Bad email')
    if (!name)
    return res.status(400).send('Bad name')
    if (objects.some(e => e.email === email) || objectFound.email === email)
    return res.status(400).send('Bad email')
    objectFound.email = email
    objectFound.name = name
    return res.json(objectFound)
})

app.patch('/directories/:id', (req, res) => {
    const { id } = req.params
    const objectFound = objects.find(e => e.id === id)
    if (!objectFound)
    return res.status(404).send('Object not found')
    const { name, email } = req.body
    if (email && !emailRegExp.test(email))
    return res.status(400).send('Bad email')
    if (email && (objects.some(e => e.email === email) || objectFound.email === email))
    return res.status(400).send('Bad email')
    if (email)
    objectFound.email = email
    if (name)
    objectFound.name = name
    return res.json(objectFound)
})

app.delete('/directories/:id', (req, res) => {
    const { id } = req.params
    const objectFound = objects.find(e => e.id === id)
    if (!objectFound)
    return res.status(404).send('Object not found')
    objects = objects.filter(e => e.id !== id)
    return res.json(objectFound)
})

app.listen(process.env.PORT || 3000, () => console.log('Server running'))