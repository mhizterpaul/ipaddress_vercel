import express, {Request, Response} from 'express'
import dotenv from 'dotenv'


const app = express();
const port = process.env.PORT || 8080;
dotenv.config();

app.set('trust proxy', true);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello!');
});


app.get('/api/hello', async (req: Request, res: Response)=>{
    const message = {
        client_ip: '',
        location: '',
        greeting: '',
    }, 
    ip = req.ip||'',
    name = req.query.visitor_name || '',
    geo = await fetch(`http://ip-api.com/json/${ip}`).then(async (response) => {
        if (!response.ok) {
            return ''
          }
          return await response.json();
    })
    .catch(error => {
        console.error('Error:', error);
        return ''
    });
    

    message.client_ip = ip;

    if(!geo){
        message.greeting = `Hello, ${name}!`
        res.json(message);
        return
    }

    message.location = geo.city||'';
    const lat = geo.lat,
    lon = geo.lon,
    apiKey = process.env.API_KEY,

    temperature = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`).then(async (response) => {
        if (!response.ok) {
            return ''
          }
          const data = await response.json();
          return data.main.temp;
    })
    .catch(error => {
        console.error('Error:', error);
        return ''
    });
    
    message.greeting = `Hello, ${name}! the temperature is ${temperature} degrees Celcius in ${geo.city||''}`

    res.json(message);

})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app