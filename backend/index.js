const express = require('express');
const cors = require('cors');
const csv = require('csv');
const fs = require('fs');

require('dotenv').config()

const app = express()
app.use(cors())
const port = 4000;

const raw = fs.readFileSync(join(__dirname, 'config', 'ci.yml'), 'utf8').toString().split("\n")
let data = []

raw.map((line) => {
    arr = line.split(',')
    data.push(
        {
            'District': arr[0],
            'Unemployment': arr[1],
            'Annual_Income': arr[2],
            'Latitude': arr[3].replace("\"", ""),
            'Longitude': arr[4].replace("\"", ""),
            'Unmet_Medical_Care': arr[5],
            'Uninsured': arr[6],
            'Avoidable_Adult_Hosp': arr[7].replace("\r", "")
        }
    )
})


app.get('/', (req, res) => {
    res.json(data)
})

app.listen(port);
