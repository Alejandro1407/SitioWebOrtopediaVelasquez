var Valid_Email = 0;
var Valid_Pass = 0;
var RegisterValidEmail = 0;
var RegisterValidNombre = 0;
var RegisterValidApellidos = 0;
var RegisterValidContraseña = 0;
var RegisterValidTelefono = 0;
var ContactValidEmail = 0;
var ContactValidNombre = 0;
var ContactValidAsunto = 0;
var ContactValidMsj = 0;
var Sesion_Iniciated = "";
var menu = "";
var Articulos = JSON.parse(localStorage.getItem("Articulos"));
if(Articulos === null){
    Articulos = [];
}
$(document).ready(function(){
   PrintMenu();
    $('#LogInFormEmail').val("");
    $('#LogInFormPassword').val("");
    $('#LogInFormEmail').on("keyup",function(){
        CheckLogInEmail(0);
    });
    $('#LogInFormEmail').on("focusout",function () { 
        CheckLogInEmail(1);
    });
    $('#LogInFormEmail').on("focus",function () { 
        $('#LogInFormEmailInValid').addClass("d-none");
        $('#LogInFormEmailValid').addClass("d-none");
        $('#LogInFormPassword').val("");
        $('#LogInFormPassword').attr("disabled","disabled");
        $('#LogInFormPassInValid').addClass("d-none");
        $('#LogInFormPassValid').addClass("d-none");
        $('#LogInFormBtn').attr("disabled","disabled");
        Valid_Pass = 0;
     });
     /* Contraseña */
    $('#LogInFormPassword').on("keyup" , function(){
        CheckLogInPassword(0);
    });
    $('#LogInFormPassword').on("focusout",function () { 
        CheckLogInPassword(1);
    });
    $('#LogInFormEmail').on("focus",function () { 
        $('#LogInFormPassValid').addClass("d-none");
        $('#LogInFormPassInValid').addClass("d-none");
    });
    $('#ShowPassLogin').on("click",function() {
        $('#ShowPassLogin').toggleClass("fa-eye");
        $('#ShowPassLogin').toggleClass("fa-eye-slash");
    var Attr = $('#LogInFormPassword').attr("type"); //Se obtiene el metodo Actual
        if(Attr === "password"){
            $('#LogInFormPassword').attr("type","text");
        }else{
            $('#LogInFormPassword').attr("type","password");
        }
    });
    $('#LogInFormBtn').on("click",function(){
            FormLogIn();
    });
    $('#RegisterFormNombre').on("keyup",function(){
        CheckRegisterNombre(0);
    });
    $('#RegisterFormNombre').on("focusout",function(){
        CheckRegisterNombre(1);
    });
    $('#RegisterFormApellidos').on("keyup", function () {
        CheckRegisterApellidos(0);
    });
    $('#RegisterFormApellidos').on("focusout", function () {
        CheckRegisterApellidos(1);
    });
    $('#RegisterFormNombre').on("focus",function () { 
        $('#RegisterFormNombreValid').addClass("d-none");
        $('#RegisterFormNombreInValid').addClass("d-none");
    });
    $('#RegisterFormEmail').on("keyup" ,function(){
        CheckRegisterEmail(0);
    });
    $('#RegisterFormEmail').on("focusout",function(){
        CheckRegisterEmail(1);
    });
    $('#RegisterFormEmail').on("focus",function () { 
        $('#RegisterFormEmailValid').addClass("d-none");
        $('#RegisterFormEmailInValid').addClass("d-none");
    });
    $('#RegisterFormPass').on("keyup",function(){
        CheckRegisterPass(0);
    });
    $('#RegisterFormPass').on("focusout" ,function(){
        CheckRegisterPass(1);
    });
    $('#RegisterFormPass').on("focus",function () { 
        $('#RegisterFormPassValid').addClass("d-none");
        $('#RegisterFormPassInValid').addClass("d-none");
    });
    $('#ShowPassRegister').on("click",function() {
        $('#ShowPassRegister').toggleClass("fa-eye");
        $('#ShowPassRegister').toggleClass("fa-eye-slash");
         var Attr = $('#RegisterFormPass').attr("type"); //Se obtiene el metodo Actual
        if(Attr == "password"){
            $('#RegisterFormPass').attr("type","text");
        }else{
            $('#RegisterFormPass').attr("type","password");
        }
    });
    $('#RegisterFormBtn').on("click",function(){
            Registro();
    });
    /* Contacto */
    $('#ContactFormNombre').on("keyup",function () { 
         CheckContactNombre(0);
    });
    $('#ContactFormNombre').on("focusout",function () { 
         CheckContactNombre(1);
    });
    $('#ContactFormAsunto').on("keyup",function () { 
         CheckContactAsunto(0);
    });
    $('#ContactFormAsunto').on("focusout",function () { 
         CheckContactAsunto(1);
    });
    $('#ContactFormEmail').on("keyup",function () { 
         CheckContactEmail(0);
    });
    $('#ContactFormEmail').on("focusout",function () { 
         CheckContactEmail(1);
    });
    $('#ContactFormMsj').on("keyup",function () { 
          CheckContactMSJ();
    });
    $('#ContactFormMsj').on("focusout",function () { 
          CheckContactMSJ();
    });
    $('#ContactFormBtn').on("click",function () { 
          Contacto();
    });
    /* Para abrir el Carrito */
    $('#CartDrop').on("show.bs.dropdown",function(e){
         //Muestra los datos de carrito
        e.preventDefault(); //Previene que se ejecute como un Dropdown Normal
        var ActualState = $('#CartDrop').css("display");
        if(ActualState == "none"){
            $('#CartDrop').css("display","block");//Se muestra manualmente
            MostrarCarrito();
        }else{
            $('#CartDrop').css("display","none");//Se muestra manualmente
        }
    });
    $('#BtnCerrarDropCart').on("click",function(){
            $('#CartDrop').css("display","none"); //Cierra el DropDown
    })
});

function CerrarSesion() {
    localStorage.setItem("ShowOutAlert","1");
    sessionStorage.removeItem("Sesion");
    localStorage.removeItem("Articulos");
    localStorage.removeItem("contador");
    localStorage.removeItem("Current");
    localStorage.removeItem("IsAdmin");
    localStorage.removeItem("Email");
    localStorage.removeItem("Registro");
    location.reload();
}
function PrintMenu(){
    Sesion_Iniciated= sessionStorage.getItem("Sesion");
    if(Sesion_Iniciated === null){
        var ShowOutAlert = localStorage.getItem("ShowOutAlert");
        if(ShowOutAlert !== null){
            localStorage.removeItem("ShowOutAlert");
                toastr.error("Sesion Finalizada",'Cuenta',{
                "progressBar":true,
                "closeButton": true
            });
        }
        menu = '<a class="text-dark" data-toggle="modal" data-target="#modalLoginForm"><span class="mr-3"> <i class="fas fa-sign-in-alt"></i>Entrar</span></a>';
        menu += '<a class="text-dark" data-toggle="modal" data-target="#modalRegisterForm"><span><i class="fas fa-user-plus"></i> Registrarse</span> </a>';
        menu += '<button class="btn btn-white p-0 m-0 shadow-none" data-target="#CartDrop" data-toggle="dropdown"><i class="fas fa-2x fa-shopping-cart"></i><span class="badge badge-dark" id="Carrito_Conta">0</span></button>';
        document.getElementById("Sesion").innerHTML =  menu;
        return;
    }
        var ShowAlert = localStorage.getItem("ShowAlert","0");
        if(ShowAlert !== null){
            localStorage.removeItem("ShowAlert");
                toastr.success("Bienvenido " + Sesion_Iniciated,'Login',{
                "progressBar":true,
                "closeButton": true
            });
        }
        menu = '<div class="dropdown">';
        menu += '<button type="button" class="btn btn-white shadow-none text-lowercase dropdown-toggle p-3 m-0" data-toggle="dropdown">Hola, ' +Sesion_Iniciated+'</button>';
        menu += '<div class="dropdown-menu">';
        if(localStorage.getItem("IsAdmin") !== null){
         
            menu += '<a class="dropdown-item" href="Administracion/Catalogo.html"><i class="fas fa-chart-pie"></i> Panel de Administrador</a>';
            menu += '<a class="dropdown-item" href="Administracion/Catalogo.html"><i class="fas fa-envelope"></i>  Correo </a>';
            menu += '<a class="dropdown-item" href="Administracion/Administradores.html"><i class="far fa-address-card"></i>  Administradores </a>';
            menu += '<hr>';
        }
        menu += '<a class="dropdown-item p-2" href="Cuenta.html"><i class="fas fa-user-circle"></i> Cuenta</a>';
        menu += '<a onclick="CerrarSesion()" class="dropdown-item p-2"><i class="fas fa-sign-out-alt"></i> Cerrar Sesion</a>';
        menu += '</div>';
        menu += '</div>';
        menu += '<button class="btn btn-white p-0 m-0 shadow-none" data-target="#CartDrop" data-toggle="dropdown"><i class="fas fa-2x fa-shopping-cart"></i><span class="badge badge-dark" id="Carrito_Conta">0</span></button>';
        
        $('#Sesion').html(menu);
}
function  CheckLogInEmail(Isfocusout) {
    var Check_Email = /^(\w){5,}(@){1}(\w){1,}(\.{1}(\w){2,}){1,}$/g;
    var Email = $('#LogInFormEmail').val();
    var Check = Check_Email.test(Email);
    if(Check === true){ //Debe ser igualada o genera Bug 
        $.ajax({
            type:'POST',
            url:'/Home/CheckEmail',
            data:{'email':Email},
            success: function (answer) {
                if(answer ===  "False"){
                    $('#LogInFormEmailInValid').addClass("d-none");
                    $('#LogInFormEmailValid').removeClass("d-none");
                    $('#LogInFormPassword').removeAttr("disabled","disabled");
                            Valid_Email = 1;
                            if(Valid_Email === 1 && Valid_Pass === 1){
                                $('#LogInFormBtn').removeAttr("disabled","disabled");
                            }else{
                                $('#LogInFormBtn').attr("disabled","disabled");
                            }
                }else{
                    $('#LogInFormPassword').attr("disabled","disabled");
                    Valid_Email = 0;
                    $('#LogInFormEmailValid').addClass("d-none");
                    $('#LogInFormEmailInValid').removeClass("d-none");
                }
            }//Success
        })//Ajax
    }else{ //Si el Email no es Valido
        Valid_Email = 0;
        $('#LogInFormPassword').attr("disabled","disabled");
        $('#LogInFormEmailValid').addClass("d-none");
         if(Isfocusout === 1){
            $('#LogInFormEmailInValid').removeClass("d-none");
        }
    }
}
function CheckLogInPassword(Isfocusout) {
    var Check_PassWord = /^[A-Z]{1}((\w){1,})*(\d)$/;
    var password = $('#LogInFormPassword').val();
    var Check = Check_PassWord.test(password);
    if (Check === true) { //Debe ser igualada o genera Bug
            $('#LogInFormPassInValid').addClass("d-none");
            $('#LogInFormPassValid').removeClass("d-none");
            Valid_Pass = 1;
            if (Valid_Email === 1 && Valid_Pass === 1) {
                $('#LogInFormBtn').removeAttr("disabled", "disabled");
            } else {
                $('#LogInFormBtn').attr("disabled", "disabled");
            }
        } else {
           
            Valid_Pass = 0;
            $('#LogInFormPassValid').addClass("d-none");
        if(Isfocusout === 1){
            $('#LogInFormPassValid').addClass("d-none");
            $('#LogInFormPassInValid').removeClass("d-none");
    }
  }
}
function FormLogIn() {
    var Email = Email = $('#LogInFormEmail').val();
    var password = $('#LogInFormPassword').val();
    $('#m-footer-login').html('<img src="/Content/img/Loading.gif">');
    $.ajax({
        type: 'POST',
        url: '/Home/ComprobarLogin',
        data: { 'email': Email, 'contrasena': password },
        success: function (temp) {
            var answer = JSON.parse(temp);
            console.log(answer);
            if (answer.ValidData === true) {
                localStorage.setItem("ShowAlert", "1");
                setTimeout(function () {
                    sessionStorage.setItem("Sesion", answer.Nombre);
                    localStorage.setItem("Email", Email);
                    //localStorage.setItem("Registro",answer.Registro);
                    document.getElementById('m-footer-login').innerHTML = '<i class="fa fa-check fa-4x mb-3 FormValid animated rotateIn"></i>';
                    setTimeout(function () { location.reload(); }, 1000);
                }, 1000);
            }
        }
    });
}//Funcion  
function CheckRegisterNombre(Isfocusout) { 
    var Check_Nombre= /^([A-Z]{1})+([a-z]){2,}(([" "][A-Z][a-z]{1,})?){1}$/g 
    var Nombre = $('#RegisterFormNombre').val();
    var Check = Check_Nombre.test(Nombre);
    if(Check === true){
        RegisterValidNombre = 1;
        $('#RegisterFormNombreInValid').addClass("d-none");
        $('#RegisterFormNombreValid').removeClass("d-none");
        if ((RegisterValidNombre === 1) && (RegisterValidApellidos === 1) && (RegisterValidEmail === 1) && (RegisterValidContraseña === 1)) {
            $('#RegisterFormBtn').removeAttr("disabled","disabled");
        }else{
            $('#RegisterFormBtn').attr("disabled","disabled");
        }
    }else{
        RegisterValidNombre = 0;
        $('#RegisterFormBtn').attr("disabled","disabled");
        $('#RegisterFormNombreValid').addClass("d-none");
    if(Isfocusout == 1){
        $('#RegisterFormNombreValid').addClass("d-none");
        $('#RegisterFormNombreInValid').removeClass("d-none");
     }
    }
}//RegisterNombre
function CheckRegisterApellidos(Isfocusout) {
    var Check_Apellidos = /^([A-Z]{1})+([a-z]){2,}(([" "][A-Z][a-z]{1,})?){1}$/g
    var Apellidos = $('#RegisterFormApellidos').val();
    var Check = Check_Apellidos.test(Apellidos);
    if (Check === true) {
        RegisterValidApellidos = 1;
        $('#RegisterFormApellidosInValid').addClass("d-none");
        $('#RegisterFormApellidosValid').removeClass("d-none");
        if ((RegisterValidNombre === 1) && (RegisterValidApellidos === 1) && (RegisterValidEmail === 1) && (RegisterValidContraseña === 1)) {
            $('#RegisterFormBtn').removeAttr("disabled", "disabled");
        } else {
            $('#RegisterFormBtn').attr("disabled", "disabled");
        }
    } else {
        RegisterValidApellidos = 0;
        $('#RegisterFormBtn').attr("disabled", "disabled");
        $('#RegisterFormApellidosValid').addClass("d-none");
        if (Isfocusout == 1) {
            $('#RegisterFormApellidosValid').addClass("d-none");
            $('#RegisterFormApellidosInValid').removeClass("d-none");
        }
    }
}//RegisterApellidos
function CheckRegisterEmail(Isfocusout){
    var Check_Email = /^(\w){5,}(@){1}(\w){1,}(\.{1}(\w){2,}){1,}$/g;
    var Email = $('#RegisterFormEmail').val();
    var Check = Check_Email.test(Email);
    if(Check === true){ //Debe ser igualada o genera Bug
     $.ajax({
            type:'POST',
            url:'/Home/CheckEmail',
            data:{'email':Email},
         success: function (answer) {
             console.log(answer);
                if (answer === "True") {
                    console.log(answer);
                    RegisterValidEmail = 1;
                    $('#RegisterFormEmailInValid').addClass("d-none");
                    $('#RegisterFormEmailValid').removeClass("d-none");
                    if ((RegisterValidNombre === 1) && (RegisterValidApellidos === 1) && (RegisterValidEmail === 1) && (RegisterValidContraseña === 1)) {
                    $('#RegisterFormBtn').removeAttr("disabled","disabled");
                }else{
                    $('#RegisterFormBtn').attr("disabled","disabled");
                }
            }else{
                RegisterValidEmail = 0;
                $('#RegisterFormEmailValid').addClass("d-none");
                $('#RegisterFormEmailInValid').removeClass("d-none");
            }//Else
        }//Success
    })//Ajax
}else{//Por si el email no es valido
    RegisterValidEmail = 0;
    $('#RegisterFormBtn').attr("disabled","disabled");
    $('#RegisterFormEmailValid').addClass("d-none");
    if(Isfocusout == 1){
        $('#RegisterFormEmailValid').addClass("d-none");
        $('#RegisterFormEmailInValid').removeClass("d-none");
        }
    }
}//Funcion
function CheckRegisterPass(Isfocusout){
    var Check_PassWord = /^[A-Z]{1}((\w){1,})*(\d{1,})$/g;
    var password = $('#RegisterFormPass').val();
    var Check = Check_PassWord.test(password);
    if(Check === true){ //Debe ser igualada o genera Bug 
        RegisterValidContraseña = 1;
        $('#RegisterFormPassInValid').addClass("d-none");
        $('#RegisterFormPassValid').removeClass("d-none");
        if ((RegisterValidNombre === 1) && (RegisterValidApellidos === 1) && (RegisterValidEmail === 1) && (RegisterValidContraseña === 1)) {
            $('#RegisterFormBtn').removeAttr("disabled","disabled");
        }else{
            $('#RegisterFormBtn').attr("disabled","disabled");
        }
        }else{
            $('#RegisterFormBtn').attr("disabled","disabled");
            RegisterValidContraseña = 0;
            $('#RegisterFormPassValid').addClass("d-none");
         if(Isfocusout === 1){
            $('#RegisterFormPassValid').addClass("d-none");
            $('#RegisterFormPassInValid').removeClass("d-none");
        }
    }
}
function Registro() {
    var Nombre = $('#RegisterFormNombre').val();
    var Apellidos = $('#RegisterFormApellidos').val();
    var Email = $('#RegisterFormEmail').val();
    var Contraseña = $('#RegisterFormPass').val();
    var Genero = $('#RegisterFormGenero').val();
    var Edad = $('#RegisterFormGenero').val();
    
       $.ajax({
        type:"POST", //Tipo de peticion
           url: '/Home/RegistrarUsuario', //Url para la peticion
           data: { email: Email, apellidos: Apellidos, usuario: Nombre, contrasena: Contraseña, genero: Genero, edad: Edad },
        beforeSend:function(){
            $('#m-footer-registro').html('<img src="/Content/img/Loading.gif">');
        }, 
        success:function(answer){
            if(answer === "True"){
                localStorage.setItem("Email",Email);
                $('#m-footer-registro').html('<i class="fa fa-check fa-4x mb-3 FormValid animated rotateIn"></i>');
                sessionStorage.setItem("Sesion",Nombre);
                setTimeout (function () {location.reload()},2000);
                return;
            }
        }
    })//Ajax
}//Funcion

/*  Funciones Contacto */
function CheckContactNombre(Isfocusout) {  
    var Check_Nombre= /^([A-Z]{1})+([a-z]){2,}(([" "][A-Z][a-z]{1,})?){1}$/g 
    var Nombre = $('#ContactFormNombre').val();
    var Check = Check_Nombre.test(Nombre);
    if(Check === true){
        ContactValidNombre = 1;
        $('#ContactFormNombreInValid').addClass("d-none");
        $('#ContactFormNombreValid').removeClass("d-none");
        if((ContactValidNombre === 1) && (ContactValidAsunto === 1) &&  (ContactValidEmail === 1) &&(ContactValidMsj === 1)){
            $('#ContactFormBtn').removeAttr("disabled","disabled");
        }else{
            $('#ContactFormBtn').attr("disabled","disabled");
        }
    }else{
        RegisterValidNombre = 0;
        $('#ContactFormBtn').attr("disabled","disabled");
        $('#ContactFormNombreValid').addClass("d-none");
    if(Isfocusout == 1){
        $('#ContactFormNombreValid').addClass("d-none");
        $('#ContactFormNombreInValid').removeClass("d-none");
     }
    }
}//Check Nombre
function CheckContactAsunto(Isfocusout) { 
    var CheckAsunto = /^[A-Z]?[a-z]{1,}$/g
    var Asunto = $('#ContactFormAsunto').val();
    var Check = CheckAsunto.test(Asunto);
    if(Check === true){
        ContactValidAsunto = 1;
        $('#ContactFormAsuntoInValid').addClass("d-none");
        $('#ContactFormAsuntoValid').removeClass("d-none");
        if((ContactValidNombre === 1) && (ContactValidAsunto === 1) &&  (ContactValidEmail === 1) &&(ContactValidMsj === 1)){
            $('#ContactFormBtn').removeAttr("disabled","disabled");
    }else{
        $('#ContactFormBtn').attr("disabled","disabled");
    }
    }else{
        ContactValidEmail = 0;
        $('#ContactFormBtn').attr("disabled","disabled");
        $('#ContactFormAsuntoValid').addClass("d-none");
        if(Isfocusout == 1){
            $('#ContactFormAsuntoValid').addClass("d-none");
            $('#ContactFormAsuntoInValid').removeClass("d-none");
        }
    }
}
function CheckContactEmail(Isfocusout){
    var Check_Email = /^(\w){5,}(@){1}(\w){1,}(\.{1}(\w){2,}){1,}$/g;
    var Email = $('#ContactFormEmail').val();
    var Check = Check_Email.test(Email);
    if(Check === true){ //Debe ser igualada o genera Bug 
                    ContactValidEmail = 1;
                    $('#ContactFormEmailInValid').addClass("d-none");
                    $('#ContactFormEmailValid').removeClass("d-none");
                    if((ContactValidNombre === 1) && (ContactValidAsunto === 1) &&  (ContactValidEmail === 1) &&(ContactValidMsj === 1)){
                        $('#ContactFormBtn').removeAttr("disabled","disabled");
                }else{
                    $('#ContactFormBtn').attr("disabled","disabled");
                }
    }
    else{
        ContactValidEmail = 0;
        $('#ContactFormBtn').attr("disabled","disabled");
        $('#ContactFormEmailValid').addClass("d-none");
         if(Isfocusout == 1){
            $('#ContactFormEmailValid').addClass("d-none");
            $('#ContactFormEmailInValid').removeClass("d-none");
        }
    }
}
function CheckContactMSJ(){
    var MSJ = $('#ContactFormMsj').val();
    
    if(MSJ.length > 5){
        ContactValidMsj = 1;
        if((ContactValidNombre === 1) && (ContactValidAsunto === 1) &&  (ContactValidEmail === 1) &&(ContactValidMsj === 1)){
            $('#ContactFormBtn').removeAttr("disabled","disabled");
        }else{
            $('#ContactFormBtn').attr("disabled","disabled");
        }
    }else{
        ContactValidMsj = 0;
    }
}
function Contacto(){
  $('#ContactoSuccessModal').modal('show');
  $('#ContactForm').modal('hide');
}
function MostrarCarrito(){
    $('#ShowCart').html('<img src="/Content/img/Loading.gif" class="ml-auto mr-auto d-block">');
    let Articulos = JSON.parse(localStorage.getItem("Articulos"));
    let Sesion = sessionStorage.getItem("Sesion");
     if(Sesion ===  null){
        $('#ShowCart').html('<p class=" w-100 text-center text-muted">No ha iniciado Sesion</p>');
        return;
    }
    if(Articulos === null||Articulos.length === 0){
        $('#ShowCart').html('<p class=" w-100 text-center text-muted">Carrito Vacio</p>');
        return;
    }
    let to_print = ''; //'<button  onclick="CheckOut()" class="btn btn-white ml-auto d-block mr-5 p-2 shadow-none Font-Family-Lato"><i class="far fa-2x fa-credit-card"></i> CheckOut</button>';
    for (let i = 0; i < Articulos.length; i++){
        console.log(Articulos[i]);
            to_print += '<div class="col-12 row">';
            to_print += '<div class="col-xl-11 col-lg-11 col-md-11 col-sm-11 col-11"><div class="img" id="img"><img src="data:image/png;base64,' + Articulos[i].Imagen +'" class="ProductoImgCart float-left img - fluid"/></div>';
            to_print += '<div id="Price" class="w-75">Envio Gratis</div>  <br />';
            to_print += '<p id="Tipe" class="text-center m-0">' + Articulos[i].Nombre +'</p>';
            to_print += '<p class="text-muted text-center">' + Articulos[i].Tipo+'</p>';
            to_print += '<p class="text-muted text-center">Descripcion:'+Articulos[i].Descripcion+'</p></div>';
            to_print += '<div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 text-center d-flex align-items-center justify-content-center">';
            to_print += '<button id="'+Articulos[i].Nombre+'"+ class="btn btn-white shadow-none p-0 m-0" onclick="DeleteFromCart(this.id)"><i class="fas fa-trash-alt fa-2x"></i></button></div></div>';
            to_print += '<hr>'
            }
     $('#ShowCart').html(to_print);            
}

function DeleteFromCart(To_Delete){
    toastr.info("Articulo Eliminado: " + To_Delete,"Carrito",{
        "progressBar":true,
        "positionClass":"toast-top-left",
        "closeButton": true
    });
    let Articulos = JSON.parse(localStorage.getItem("Articulos"));
    let contador =  localStorage.getItem("contador");
    var TempArticulos = [];
    let j = 0;
    for(let i = 0; i<Articulos.length; i++){
    if(Articulos[i].Nombre === To_Delete){
        contador--;
    }else{
        TempArticulos[j] = Articulos[i];
        j++;
    }
    }
    if(TempArticulos.length == 0){
        toastr.error("Carrito Vacio","Carrito",{
            "progressBar":true,
            "positionClass":"toast-top-left",
            "closeButton": true
        }); 
    }
    localStorage.removeItem("Articulos");
    localStorage.removeItem("contador");
    localStorage.setItem("contador",contador);
    localStorage.setItem("Articulos", JSON.stringify(TempArticulos));
    $('#Carrito_Conta').html = localStorage.getItem("contador");
    MostrarCarrito();
}
function CheckOut(){
    let data = JSON.stringify(localStorage.getItem("Articulos")); //Se convierte a String para ser enviada
    let url = 'http://localhost:8080/Catalogo/CheckOut/' + localStorage.getItem("Email"); 
    //let url = 'https://apidaw.pythonanywhere.com/Catalogo/CheckOut/' + localStorage.getItem("Email"); 
    $.ajax({
        type:'POST',
        url:url,
        data:data,
        contentType:'application/json; charset=utf-8', //Se especifica que se envia un tipo JSON
        beforeSend:function(){
            $('#ShowCart').html('<img src="img/Loading.gif" class="ml-auto mr-auto d-block">')
        },success:function(answer){
            if(answer.valid === "True"){
                toastr.success('Factura Generada<br><span class="Font-Family-Lato"><i class="far fa-eye"></i> Click para Ver</span>',"Carrito",{
                    onclick:function () {
                        email = localStorage.getItem("Email")
                        location.href = "http://localhost:8080/Dowloads/"+email+"/"+answer.filename;
                    },
                    "showDuration": "1000",
                    "closeButton":true,
                    "progressBar":true,
                    "positionClass":"toast-top-left"
                })
                localStorage.removeItem("Articulos");
                localStorage.removeItem("contador");
                $('#Carrito_Conta').html("0");
                MostrarCarrito();
                //
            }else{
                console.log(answer)
                toastr.error("Ocurrio un error","Carrito",{
                    "closeButton":true,
                    "progressBar":true,
                    "positionClass":"toast-top-left"
                })
                MostrarCarrito();
            }
        }
    });
}


