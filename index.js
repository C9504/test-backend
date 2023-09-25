import express, { json } from "express";

const app = express();
const port = 9097;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // * permite cualquier origen
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());

app.get('/iot-events/events/:applicationID', (req, res) => {
    // Configurar encabezados para SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Enviar eventos a través de SSE
    let count = 0;
    setInterval(() => {
        const json = {
            applicationID: 'app01',
            count: count
        }
        if(json.applicationID === req.params.applicationID){
            res.write(`data: ${JSON.stringify(json)}\n\n`);
        } else{
            res.end();
        }
        
        ///res.status(200);
        count++;
        ///res.end();
    }, 2000); // Enviar un evento cada segundo

    /// Manejar cierre de la conexión
    // req.on('close', () => {
    //     console.log('Conexión SSE cerrada');
    //     clearInterval(interval);
    // });
});

app.listen(port, () => {
    console.log('Running...');
});