$(document).ready(function () {

    $("#Data").load('/Home/MostrarDatosProtesis/', { Parametro: "" }); //Al cargar el documento mostrara el Catalogo

    $('#Tipo').on("change", function (e) {
        $('#Data').html('<img src="/Content/img/Loading.gif" class="ml-auto mr-auto d-block"/><h4 class= "d-flex justify-content-center text-muted"> Cargando... </h4>');
        $('#txtBuscar').text = "";
        if (e.target.value == 1) {
            $("#Data").load('/Home/MostrarDatosProtesis/');
        } else if (e.target.value == 2) {
            $("#Data").load('/Home/MostrarDatosOrtesis/');
        }
    });

    $('#txtBuscar').on("keyup", function (e) {
        $('#Data').html('<img src="/Content/img/Loading.gif" class="ml-auto mr-auto d-block"/><h4 class= "d-flex justify-content-center text-muted"> Cargando Productos </h4 >');
        let Categoria = $('#Tipo')[0].value;
        if (Categoria == 1) {
            $("#Data").load('/Home/MostrarDatosProtesis/', { Parametro: e.target.value});
        } else if (Categoria == 2) {
            $("#Data").load('/Home/MostrarDatosOrtesis/', { Parametro: e.target.value });
        }
    });
});//Ready

function Mostrar_Info(id) {
    let Categoria = $('#Tipo')[0].value;
    console.log(Categoria);
    if (Categoria == 1) {
        $('#Modal').load('/Home/ModalProductoProtesi/', { param: id });
    } else if (Categoria == 2) {
        $('#Modal').load('/Home/ModalProductoOrtesi/', { param: id });
    }
    
}

function AddtoCart() {
    let Sesion_Iniciated = "";
    Sesion_Iniciated = sessionStorage.getItem("Sesion");
    if (Sesion_Iniciated == null) {
        $('#ConfirmAddToCart').modal('hide');
        $("#modalLoginForm").modal('show');
        return;
    }
    let contador = localStorage.getItem("contador");
    if (contador === null) {
        contador = 0;
    }

    let TempArticulos = JSON.parse(localStorage.getItem("Articulos"));
    if (TempArticulos === null) {
        TempArticulos = [];
    }
    var Current = JSON.parse(localStorage.getItem("Current"));
    var Exists = 0;
    for (let i = 0; i < TempArticulos.length; i++) {
        if (Current.Nombre === TempArticulos[i].Nombre) {
            Exists = 1;
            break;
        }
    }
    if (Exists === 0) {
        TempArticulos[contador] = Current;
        localStorage.setItem("Articulos", JSON.stringify(TempArticulos));
        contador++;
        $('#ConfirmAddToCart').modal('hide');
        localStorage.setItem("contador", contador);
        toastr.success("Articulo Agregado", "Carrito", {
            "progressBar": true,
            "closeButton": true
        });
        localStorage.setItem("contador", contador);
        document.getElementById('Carrito_Conta').innerHTML = contador;
    } else {
        $('#ConfirmAddToCart').modal('hide');
        toastr.error("Articulo Ya en Carrito ", "Carrito", {
            "progressBar": true,
            "closeButton": true
        });
    }
    MostrarCarrito();
}