function seleccionarValue(e){
    var txtboxTemp=document.getElementById('word');    
    txtboxTemp.innerHTML=e.innerHTML;;
    
}

function control(e)
{
    var val=parseInt(e.value);
    var txtentrada=document.getElementById('txt');
    var labelError=document.getElementById('label-error');
    if(isNaN(val))
    {
        labelError.innerHTML="Error: Ingresa un valor numerico (2-9)";
        e.value="";   
    }else
    {        
        labelError.innerHTML="";   
    }
}

function cargar()
{
    location.reload();
}
