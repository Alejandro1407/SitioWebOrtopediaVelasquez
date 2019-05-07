$(document).ready(function () {
    let id = localStorage.getItem("Id");
    $("#Data").load('/Paciente/MostrarCitas/', { id : id, value : 0 }); //Al cargar el documento mostrara el Catalogo
 

    

    $('#HorariosFormBtn').on("click", function (e) {
        AgregarHorario();
    });
});
diaSemana = function (d) {
    var fecha = new Date();
    var dias = ["D", "L", "M", "X", "J", "V", "S"];

    var mes = fecha.getMonth() + 1; //obteniendo mes
    var dia = d;
    var ano = fecha.getFullYear(); //obteniendo año
    if (dia < 10)
        dia = '0' + dia; //agrega cero si el menor de 10
    if (mes < 10)
        mes = '0' + mes //agrega cero si el menor de 10
    var fec = mes + "/" + dia + "/" + ano;
    var day = new Date(fec).getDay();

    return dias[day];
}

console.log(diaSemana(6));