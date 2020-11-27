const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path')
var Usuario = require('./model/usuario') 

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname,"public")));

app.get('/', function(req,res){
    Usuario.find({}).exec(function(err,docs){
        res.render('index.ejs' , {Usuarios:docs})
    });
     
})

app.get('/add',function(req,res){
    res.render('adicionar.ejs')
})

app.post('/add',function(req,res){
    var usuario = new Usuario({
        nome: req.body.txtnome,
        email: req.body.txtemail,
        senha: req.body.txtsenha,
        foto: req.body.txtfoto
    })
    
    usuario.save(function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect('/');
        }
    })
})

app.get('/del/:id', function(req,res){
        Usuario.findByIdAndDelete(req.params.id,function(err){
            if(err){
                console.log(err);
            }else{
                res.redirect('/')
            }
        })
        
})

app.get('/edit/:id', function(req,res){
    Usuario.findById(req.params.id, function(err,docs){
        if(err){
            console.log(err)
        }else{
            res.render('editar.ejs',{Usuario:docs})
        }
        

    })
    
})

app.post('/edit/:id', function(req,res){
    Usuario.findByIdAndUpdate(req.params.id,
        { nome: req.body.txtnome, 
          email: req.body.txtemail,
          senha: req.body.txtsenha,
          foto: req.body.txtfoto
        }, function(err,docs){
            res.redirect('/')
        }
          
          
          )
})

app.listen(3000,function(){
    console.log("Conexão Inicializada")
})
