import express from 'express';
import http from 'http';
import myJSON from './myJSON.js'
const app = express();
const server = http.createServer(app);

app.use(express.json());
var connections = 0;
app.get('/', (req, res) => {
  res.json(myJSON);
});

app.get('/connections', (req, res) => {
    connections++;
    res.json(connections);
});


app.get('/id=:id', (req, res) => {
    const id = req.params.id;
    console.log("Requested id " + id);
    const json = myJSON.filter((search) => search.id == id); 
    res.json(json[0]);
})

app.get('/stack=:stack', (req, res) => {
    const stack = req.params.stack;
    console.log("Requested developers with stack: " + stack);
    const myMatch = myJSON.filter((search) => {
        var found = 0;
        search.stacks.forEach(tech => {
            if(tech == stack) found = search.id;
        });
        return found;
    }); 
    res.json(myMatch[0]);
})


export default app;