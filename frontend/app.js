var express = require('express');
var app = express();

app.set('view engine', 'ejs');

const URL = process.env.BACKEND_URL || "http://localhost:8000/api";

const fetch = (...args) => 
  import('node-fetch').then(({default: fetch}) => fetch(...args));

app.get('/' , async function(req , res){
  const options = {
    method : 'GET'
  };

  fetch(URL, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));
  try { 
    let response = await fetch(URL, options);
    response = await response.json();
    res.render('index', {data : response.data});
  }catch(err){
    console.log(err);
    res.status(500).json({msg : "internal server error ."});
  }
});

app.listen(3000, function(){
  console.log('Ares listing on port 3000!');
});

