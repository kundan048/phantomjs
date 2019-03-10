var express = require('express');
var fs = require('fs');
const exec = require('child_process').exec;



var app = express();


app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", function(req, res) {

    var P1 = new Promise((resolve, reject) => {
        exec('phantomjs index.js file.html output2.pdf', (error, stdout, stderr) => {
            console.log(`stdout output: ${stdout}`);
            console.log(`stderr error: ${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
            console.log("here  it is  ---------------->");

        });
        setTimeout(() => {

            resolve("Successful");
        }, 2000);

    })
    console.log(P1);
    var file = __dirname + "/output2.pdf";
    P1.then(() => {
        
        res.download(file);
        console.log("Download Successful")
		setTimeout(() => {
			fs.unlink(file, function(err) {
	            if (err)
	                throw err;

	            console.log('File deleted!');
	        });

		}, 1000);

    });

})



app.listen(3000, function() {
	console.log("Running");
})