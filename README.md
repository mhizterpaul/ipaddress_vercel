# API

available at [domain]: http://ipaddress.eu-4.evennode.com

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

* example: http://ipaddress.eu-4.evennode.com/api/hello?visitor_name=my_name

* replace my name with your name

# Development

you can fork the code  
run npm install  
run npm dev //to start the development server  
run npm build //to compile the code 