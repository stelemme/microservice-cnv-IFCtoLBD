# IFC-to-LBD Conversion Microservice
The conversion from IFC to LBD is done by using the IFC-to-LBD converter provided by Oraskari et al. (2023)
## Installation


## Running the Microservice
To run the Microservice, a virtual environment needs to be activated using the following command.
```
.venv\Scripts\activate
```
After the virtual environment is activated the Microservice can be run using the following command. Additional arguments can be added to the command to for example run the Microservice in debug mode (--debug), which enables live reloading. The port on which the Microservice runs can also be changed with an additional argument (--port <port-number>).
```
flask --app flaskr run
```
## Using the Microservice
The functionality of this Microservice can be acces via the following endpoint.
  
[http://localhost:5000/op/qto](http://localhost:5000/op/qto)
  
This endpoint has a GET and POST method. The GET response of the endpoint returns a JSON object that specifies which methods are supported by the endpoint, in this case a GET and POST method. The JSON object also specifies the data type each method accepts and returns (given as its MIME type). For this endpoint, an LBD-file, given in the Turtle (Terse RDF Triple Language) syntax which expresses the Resource Description Framework (RDF) format, must be sent in a POST request to the endpoint. The endpoint then returns a JSON-LD file with the calculated QTO. This process can be tested using Postman or a Controller Microservice.

### Example response
```
{
    "@context": {
        "bot": "https://w3id.org/bot#",
        "props": "http://lbd.arch.rwth-aachen.de/props#",
        "quantity": {
            "@id": "schema:Quantity",
            "@type": "schema:Integer"
        },
        "schema": "http://schema.org/"
    },
    "@type": "schema:ItemList",
    "schema:itemListElement": [
        {
            "@type": "bot:Element",
            "props:objectTypeIfcObject_attribute_simple": "Basic Wall:Generic - 150mm",
            "quantity": 473
        },
        {
            "@type": "bot:Element",
            "props:objectTypeIfcObject_attribute_simple": "Basic Wall:Generic - 193mm",
            "quantity": 77
        }
    ]
}
```
