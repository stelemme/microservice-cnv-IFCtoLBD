# IFC-to-LBD Conversion Microservice
The conversion from IFC to LBD is done by using the IFC-to-LBD converter provided by Oraskari et al. (2023).
## Installation
To install this Microservice, make sure Node.js 19 or higher is installed on your device. Installing the Microservice can be done by running the following command. The command makes sure all the dependencies present in the [package.json](https://github.com/stelemme/microservice-conv-ifc-to-lbd/blob/main/package.json) file are correctly installed.
```
npm install
```
Add to the root of the Microservice two new folders: "base-files" and "cli". Add to the cli folder the [IFCtoLBD_CLI.jar](https://github.com/jyrkioraskari/IFCtoLBD/releases) developed by Oraskari et al. (2023).
## Running the Microservice
The Microservice can be run normally or in development mode respectively with the following commands.
```
npm run start
npm run start:dev
```
## Using the Microservice
The functionality of this Microservice can be acces via the following endpoint.
  
[http://localhost:3000/conv/ifc-to-lbd](http://localhost:5000/op/qto)
  
This endpoint has a GET and POST method. The GET response of the endpoint returns a JSON object that specifies which methods and data types are supported by the endpoint. This endpoint must receive an IFC-file. The POST response then returns the converted LBD-file, in the turtle format, if the IFC-file is correctly sent in the body of the request. The process can be tested using Postman or a Controller Microservice.
