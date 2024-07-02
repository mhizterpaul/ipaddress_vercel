# API

available at [domain]: https://ipaddress-rho.vercel.app

## Description

takes a query string visitor_name  
at the endpoint [domain]/api/hello  
and returns json in the format.  

{  

    'client_ip': 'ip address'  
    'location': 'user location'  
    'greeting': 'Hello, visitor_name! the temperature is temperature degrees Celcius in city'  

}

## Usage 

* example: https://ipaddress-rho.vercel.app/api/hello?visitor_name=my_name

* replace my name with your name

# Development

you can fork the code  
run npm i -g vercel  
run npm dev //to start local development server  
run vercel //to deploy