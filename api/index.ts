import express, {Request, Response} from 'express'
import geoip from 'geoip-lite'
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
    geo = geoip.lookup(ip);

    message.client_ip = ip;

    if(!geo){
        message.greeting = `Hello, ${name}!`
        res.json(message);
        return
    }

    const lat = geo.ll[0],
    lon = geo.ll[1],
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
    }),
    city = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`).then(async (response) => {
        if (!response.ok) {
            return '';
        }
        const data = await response.json();
        return data[0].name;
    })
    .catch(error => {
        console.error('Error:', error);
        return '';
    });

    message.location = city;
    message.greeting = `Hello, ${name}! the temperature is ${temperature} degrees Celcius in ${city}`

    res.json(message);

})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app