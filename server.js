const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const { createProxyMiddleware } = require('http-proxy-middleware');
app.use('/secured', createProxyMiddleware({ 
    target: 'http://localhost:8080/auth/realms/master/protocol/openid-connect/token', //original url
    changeOrigin: true, 
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));
// http://localhost:8080/auth/realms/master/protocol/openid-connect/token

app.listen(port, () => {
    console.log("server is ready");
});