var express = require('express');
var router = express.Router();
var fs = require('fs');
var datos='';
var entrada='';
var matrizInicial=new Array();
var matrizNumerica=new Array();
var col=0,aux=0;
var coincidenciasLetras=new Array();
var coincidenciasTotales=new Array();
var codigo=new Array(
    ['0',' ','*','/','#','.',',','\\',':',';','?','¿','=',"'",'"','-','_','(',')','`'],
    ['2','a','A','b','B','c','C'],
    ['3','d','D','e','E','f','F'],
    ['4','g','G','h','H','i','I'],
    ['5','j','J','k','K','l','L'],
    ['6','m','M','n','N','o','O'],
    ['7','p','P','q','Q','r','R','s','S'],
    ['8','t','T','u','U','v','V'],
    ['9','w','W','x','X','y','Y','z','Z']
);
/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', {title:"Formulario de autocompletado",datoIngresado:entrada,dato:coincidenciasTotales});
   
});

router.post('/entradas', function(req, res) 
 {
   entrada=String(req.body.txtentrada);        
   fsfile(entrada);  
        //res.render('index',{datoIngresado:entrada,dato:coincidenciasTotales}) 
        res.redirect('/');      
 });


function fsfile(entrada)
{
fs.readFile('./alice_in_wonderland.txt', 'utf8', function(err, data) {
    if( err ){ 
        console.log(err)
    }
    else{
           
        datos=data;
        //Carga de texto en la matrizInicial (array inicial)
        if(!matrizInicial.length)
            for (var key in data) {                                
                matrizInicial[col]=data[key];
                col++;
                
            }
            //Carga de valores numericos previamente comparados con la matriz inicial
            for (var i = 0; i <=col; i++) {                                  
                for(var k = 0; k <=8; k++)
                {                                        
                    for(var j = 0; j <=codigo[k].length; j++)
                    {
                        if(matrizInicial[i]==codigo[k][j])
                        {
                            matrizNumerica[i]=codigo[k][0];
                        }
                    }
                }
            }            
          }
   coincidenciasTotales=comparacion();        
});




function comparacion()
{
    //Compara la entrada con la matriz numerica, luego asigna a coincidencias el valor de la matriz inicial(el indice es el mismo que la matriz numerica)
    var j=0;
    var auxLetrasStr;
    var coincidenciasGlobales=new Array();
    for (var i in matrizNumerica) {
        if(matrizNumerica[i]==entrada[j])
        {
            coincidenciasLetras.push(matrizInicial[i]);                          
            j++;
            if(coincidenciasLetras.length==entrada.length)
            {
                auxLetrasStr=coincidenciasLetras.join("").toString();
                if((coincidenciasGlobales.indexOf(auxLetrasStr))==-1 && (codigo[0].indexOf(matrizInicial[i-entrada.length])!=-1))
                {                    
                    coincidenciasGlobales.push(auxLetrasStr);                 
                }
                                                          
            }
            
        }else{
            j=0;
            coincidenciasLetras.splice(0,coincidenciasLetras.length);   
        }
    }
        
     console.log(coincidenciasGlobales); 
     return coincidenciasGlobales;    
}





//console.log(datos);
}
module.exports = router;
