$(document).ready(function () {
    $("#Data").load('/Home/MostrarTipoProtesis/'); //Al cargar el documento mostrara el Catalogo

    $('#Tipo').on("change", function (e) {
        $('#Data').html('<img src="/Content/img/Loading.gif" class="ml-auto mr-auto d-block"/><h4 class= "d-flex justify-content-center text-muted"> Cargando... </h4>');
        $('#txtBuscar').text = "";
        if (e.target.value == 1) {
            $("#Data").load('/Home/MostrarTipoProtesis/');
        } else if (e.target.value == 2) {
            $("#Data").load('/Home/MostrarTipoOrtesis/');
        }
    });
    $('#txtBuscar').on("keyup", function (e) {
        $('#Data').html('<img src="/Content/img/Loading.gif" class="ml-auto mr-auto d-block"/><h4 class= "d-flex justify-content-center text-muted"> Cargando Productos </h4 >');
        let Categoria = $('#Tipo')[0].value;
        if (Categoria == 1) {
            $("#Data").load('/Home/MostrarTipoProtesis/', { Parametro: e.target.value});
        } else if (Categoria == 2) {
            $("#Data").load('/Home/MostrarTipoOrtesis/', { Parametro: e.target.value });
        }
    });
});