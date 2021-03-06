﻿using SitioWebOrtopediaVelásquez.Servicios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace SitioWebOrtopediaVelásquez.Controllers
{
    public class HomeController : Controller
    {
        CatalogoServicio catalogoServicio = new CatalogoServicio();
        SesionServicio sesionServicio = new SesionServicio();
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
      public PartialViewResult MostrarTipoOrtesis(String Parametro = "")
        {
            List<tipoOrtesis> Model = catalogoServicio.ObtenerTiposOrtesisAsync(Parametro);
            return PartialView("_ParcialViewIndexTipoOrtesis",Model);
        }
        public PartialViewResult MostrarTipoProtesis(String Parametro = "")
        {
            List<tipoProtesis> Model = catalogoServicio.ObtenerTiposProtesisAsync(Parametro);
            return PartialView("_ParcialViewIndexTipoProtesis", Model);
        }
        public ActionResult Catalogo()
        {
            //var model = await servicio_productos.ObtenerCategoriasAsync();
            return View();
        }
        
        public PartialViewResult MostrarDatosProtesis(string Parametro = "", bool IsSearch = false)
        {
            ViewBag.IsSearch = IsSearch;
            List<protesis> Model =  catalogoServicio.ObtenerProtesisAsync(Parametro);
            return PartialView("_ParcialViewCatalogoP", Model);
        }
        public PartialViewResult Menu(String Nombre = "", String Email = "", int TipoUsuario = 0) {
            usuario u = new usuario();
            u.nombres = Nombre;
            u.email = Email;
            u.tipoUsuario = TipoUsuario;
            return PartialView("_ParcialViewMenu",u);
        }

        public PartialViewResult MostrarDatosOrtesis(string Parametro = "", bool IsSearch = false)
        {
            ViewBag.IsSearch = IsSearch;
            List<ortesis> Model = catalogoServicio.ObtenerOrtesisAsync(Parametro);
            return PartialView("_ParcialViewCatalogoO", Model);
        }
        
        [HttpPost]
        public bool CheckEmail(string email)
        {
            return sesionServicio.CheckEmail(email);
        }
        
        [HttpPost]
        public bool RegistrarUsuario(string email, string contrasena, string usuario, string apellidos,string genero,DateTime edad,string alergias)
        {
            usuario p = new usuario();
            p.email = email;
            p.nombres = usuario;
            p.apellidos = apellidos;
            p.contrasenya = contrasena;
            p.sexo = genero;
            p.tipoUsuario = 3;
            p.fechaNacimiento = edad;
            p.alergias = alergias;
            return sesionServicio.RegistarPaciente(p);
        }
        
        [HttpPost]
        public string ComprobarLogin(string email = "", string contrasena = "")
        {
            return sesionServicio.ComprobarLogin(email, contrasena);
        }
        
        [HttpPost]
        public PartialViewResult ModalProductoProtesi(int param)
        {
            protesis model = catalogoServicio.ObtenerProtesiAsync(param);
            return PartialView("_ParcialViewModalP", model);
        }
        [HttpPost]
        public PartialViewResult ModalProductoOrtesi(int param)
        {
            ortesis model = catalogoServicio.ObtenerOrtesiAsync(param);
            return PartialView("_ParcialViewModalO", model);
        }

    }//Clase
}//NameSpace