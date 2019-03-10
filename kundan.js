var express = require('express');
var fs = require('fs');
const exec = require('child_process').exec;



var app = express();


app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", function(req, res) {
	const child = exec('phantomjs index.js file.html output2.pdf',
	    (error, stdout, stderr) => {
	        console.log(`stdout output: ${stdout}`);
	        console.log(`stderr error: ${stderr}`);
	        if (error !== null) {
	            console.log(`exec error: ${error}`);
	        }

	     var file = __dirname + "/output2.pdf";
  		 res.download(file);
		// fs.unlinkSync(file, function (err) {
		//     if (err) throw err;
		//     // if no error, file has been deleted successfully
		//     console.log('File deleted!');
		// });
	});
	
})


app.listen(3000, function() {
	console.log("Running");
})