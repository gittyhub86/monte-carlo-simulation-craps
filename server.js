var express = require('express'),
	app = express();

app.use(express.static('./'));

app.listen(3000);
console.log('Server listening on port 3000');