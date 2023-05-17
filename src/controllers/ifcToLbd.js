const path = require("path");
const { executeChildProcess, deleteFile } = require('./helper')
const fs = require('fs')

const descriptionGET = (req, res) => {
  var options = {
    root: path.join(__dirname, "..", "..", "public"),
    headers: {
      Server: "My Node.js Server",
      "Content-Type": "text/html",
    },
  };
  res.status(200).sendFile("ifcToLbd.html", options);
};

const IfcToLbdGET = (req, res) => {
  res.set({
    Server: "My Node.js Server",
    "Content-Type": "application/json",
  });

  res.status(200).json({
    message:
      "Send an IFC file to this endpoint with an HTTP POST request to convert it to an LBD format.",
    accepts: "application/ifc",
    returns: "text/turtle",
  });
};

const IfcToLbdPOST = async (req, res, next) => {
  const filepath = req.file.path
  const baseUri = req.body.base
  let result = await convert(filepath, baseUri)

  const resultLocation = result[result.length - 1]
  fs.readFile(resultLocation, (err, data) => {
      if (err) {
        throw err;
      }
      res.status(200).send(data)
      result.forEach(f => deleteFile(f))
      
    });
}

convert = async (file, baseUri) => {
  return new Promise(async (resolve, reject) => {
      const modes = ["IFCtoLBD"]
      let order = []

      modes.forEach((mode) => {
          const { command, fileExtension } = switcher(mode, baseUri, file)
          order.push({ command, mode, fileExtension })
      })

      let IfcPlaceholder = `${process.cwd()}/${file}`
      let createdFiles = [IfcPlaceholder]


      try {
          for (const conversion of order) {
              console.log('converting to', conversion.mode.substring(5))
              console.log('conversion', conversion)
              const perform = await executeChildProcess(conversion.command)
              console.log(conversion.mode.substring(5), 'done')
              const placeholder = `${process.cwd()}/${file}.${conversion.fileExtension}`
              createdFiles.push(placeholder)
          }
      } catch (error) {
          reject(error)
      }

      resolve(createdFiles)
  })
}

const switcher = (originalUrl, baseUri, base) => {
  let command, fileExtension
  switch (originalUrl) {
      case 'IFCtoOWL':
          command = `java -jar ${process.cwd()}/cli/IFCtoRDF/IFCtoRDF-0.4-SNAPSHOT.jar --baseURI ${baseUri} ${process.cwd()}/${base} ${process.cwd()}/${base}.ttl`
          fileExtension = 'ttl'
          break;
      case 'IFCtoLBD':
          command = `java -jar ${process.cwd()}/cli/IFCtoLBD/IFCtoLBD.jar ${process.cwd()}/${base} ${baseUri} ${process.cwd()}/${base}.lbd.ttl`
          fileExtension = 'lbd.ttl'
          break;
      case 'IFCtoDAE':
          if (process.platform === "linux") {
              command = `${process.cwd()}/cli/IfcConvert ${process.cwd()}/${base} --use-element-guids ${process.cwd()}/${base}.dae`
          } else if (process.platform === "win32") {
              command = `${process.cwd()}/cli/IfcConvert.exe ${process.cwd()}/${base} --use-element-guids ${process.cwd()}/${base}.dae`
          }
          fileExtension = 'dae'
          break;
      case 'IFCtoGLTF':
          if (process.platform === "linux") {
              command = `${process.cwd()}/cli//COLLADA2GLTF/COLLADA2GLTF-bin ${process.cwd()}/${base}.dae ${process.cwd()}/${base}.gltf`
          } else if (process.platform === "win32") {
              command = `${process.cwd()}/cli//COLLADA2GLTF/COLLADA2GLTF-bin.exe ${process.cwd()}/${base}.dae ${process.cwd()}/${base}.gltf`
          }
          fileExtension = 'gltf'
          break;
      default:
          break;
  }

  return { command, fileExtension }
}

module.exports = {
  descriptionGET,
  IfcToLbdGET,
  IfcToLbdPOST,
};
