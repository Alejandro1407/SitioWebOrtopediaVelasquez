using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SitioWebOrtopediaVelásquez.Controllers
{
    public class PacienteController : Controller
    {
        // GET: Paciente
        public ActionResult Citas()
        {
            return View();
        }
    }
}