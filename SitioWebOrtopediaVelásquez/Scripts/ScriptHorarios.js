$(document).ready(function () {
    let id = localStorage.getItem("Id");
    $("#Data").load('/Medico/MostrarHorarios/', { id : id, value : 0 }); //Al cargar el documento mostrara el Catalogo

    $('#Tipo').on("change", function (e) {
        console.log(id);
        $('#Data').html('<img src="/Content/img/Loading.gif" class="ml-auto mr-auto d-block"/><h4 class= "d-flex justify-content-center text-muted"> Cargando... </h4>');
        $('#txtBuscar').text = "";
        $("#Data").load('/Medico/MostrarHorarios/', { id: id , value: e.target.value });
        
    });
});