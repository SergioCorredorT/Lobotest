var primeraCarga=true;
//Devuelve true si el navegador es compatible, y por lo tanto, tiene una versión de JS compatible
function ComprobarCompatibilidadAsync()
{
    try
    {
        eval(`typeof Object.getPrototypeOf(async function(){}).constructor === 'function'`);
        return true;
    }
    catch (exception)
    {
        return false;
    }
}

//Función a la que se le llamará en el último archivo js
function comprobarErrorCarga()
{
    primeraCarga=false;
    if(sinError)
    {
        document.getElementById("comprobacionCargaScriptErronea").style.display="none";
        if(ComprobarCompatibilidadAsync())
        {
            document.getElementById("comprobacionCargaScriptCorrecta").style.display="flex";
        }
        else
        {
            document.getElementById("comprobacionCargaScriptCorrectaConIncompatibilidad").style.display="flex";
        }
    }
    else
    {
        setTimeout(function()
        {
            window.location.reload();
        },1000);
    }
}

//Este archivo debe cargar el primero
var sinError=true;
window.onerror=function(message,url)
{
    if(primeraCarga)
    {
        sinError=false;
        comprobarErrorCarga();
    }
}