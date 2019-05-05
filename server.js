let express = require('express');
let bodyParser = require('body-parser');

let app = express();

// 配置body-parser中间件
app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'x-requested-with, x-ui-request, lang');
    next();
});

app.get('/', (req, res) => {
	res.send({
		msg: 'ok'
	})
})

app.post('/add', (req, res) => {
	let param = req.body.a; 
	console.log(req.body);
	console.log(param);
	res.send({
		post: 'ok'
	})
});

app.listen(3000, function () {
	console.log('running at port 3000...');
});