$(document).ready(function () {
    let id = localStorage.getItem("Id");
    $("#Data").load('/Medico/MostrarHorarios/', { id : id, value : 0 }); //Al cargar el documento mostrara el Catalogo

    $('#Tipo').on("change", function (e) {
        console.log(id);
        $('#Data').html('<img src="/Content/img/Loading.gif" class="ml-auto mr-auto d-block"/><h4 class= "d-flex justify-content-center text-muted"> Cargando... </h4>');
        $('#txtBuscar').text = "";
        $("#Data").load('/Medico/MostrarHorarios/', { id: id , value: e.target.value });
    });

    $('#HorariosFormBtn').on("click", function (e) {
        AgregarHorario();
    });
});

function AgregarHorario() {
    console.log("Clicked");
    //$('#Error').removeClass("d-block");
    let id = localStorage.getItem("Id");
    let dia = $('#HorariosFormDia').val();
    let hora = $('#HorariosFormHora').val();
    $('#m-footer-horarios').html('<img src="/Content/img/Loading.gif">');
    $.ajax({
        type: 'POST',
        url: '/Medico/AgregarHorario',
        data: { Id : id, Dia: dia, Hora: hora },
        success: function (answer) {
            console.log(answer);
            if (answer == "True") {
                setTimeout(function () {
                    $('#m-footer-horarios').html('<i class="fa fa-check fa-4x mb-3 FormValid animated rotateIn"></i>');
                    setTimeout(function () { location.reload(); }, 1000);
                }, 1000);
            } else {
                $('#Error').addClass("d-block");
                $('#m-footer-horarios').html('<button class="btn btn-indigo" id="HorariosFormBtn"><i class="fas fa-plus"></i>Agregar</button>');
            }
        }//Success
    });
}