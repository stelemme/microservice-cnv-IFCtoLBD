const cp = require('child_process')
const fs = require('fs');

exports.executeChildProcess = (cmd_exec) => {
    return new Promise((resolve, reject) => {
        let child = cp.exec(cmd_exec, { maxBuffer: 1024 * 1024 * 50 })
        child.on('exit', function (exit_code) {
            console.log("closed with exit code", exit_code)
            if (exit_code === 0) {
                resolve(exit_code)
            } else {
                reject(exit_code)
            }
        });
    })
}

exports.deleteFile = (path) => {
    try {
        fs.unlinkSync(path)
        console.log(path + ' was deleted successfully')
    } catch (err) {
        console.error(err)
    }
}