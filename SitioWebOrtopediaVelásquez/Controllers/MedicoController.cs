using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SitioWebOrtopediaVelásquez.Servicios;

namespace SitioWebOrtopediaVelásquez.Controllers
{
    public class MedicoController : Controller
    {
        CatalogoServicio catalogoServicio = new CatalogoServicio();

        public ActionResult Horarios()
        {
            return View();
        }
        public PartialViewResult MostrarHorarios(int id, int value = 0) {
            List<Horarios> h;
            if (value == 0) {
                 h = catalogoServicio.ObtenerHorariosAsync(id);
            }
            else{
                 h = catalogoServicio.ObtenerHorariosAsync(id, value);
            }

            return PartialView("_ParcialViewHorarios",h);
        }
    }
}