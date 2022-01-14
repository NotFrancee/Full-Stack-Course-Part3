const express = require("express")
const app = express() 
app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
  return Math.random() * 10000000
}

app.get("/", (req, res) => {
    res.send("hello world")
})

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.post("/api/persons", (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: "missing name"
    })
  }

  const newPerson = {
    name: body.name,
    number: Number(body.number),
    id: generateId() 
  }

  persons = persons.concat(newPerson)
  res.json(newPerson)
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    person ? res.json(person) : res.status(404).end()
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)

    persons = persons.filter(person => person.id !== id)

    res.status(202).end()
})

app.get("/api/info", (req, res) => {
    const date = new Date() 

    res.write(`<p> Phonebook has Info for ${persons.length} People</p>`)
    res.write(`<p>${date}</p>`)

    res.send()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})