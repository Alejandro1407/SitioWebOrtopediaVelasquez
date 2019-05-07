using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SitioWebOrtopediaVelásquez.Servicios
{
    class CatalogoServicio
    {
        public List<ortesis> ObtenerOrtesisAsync(String param)
        {

            List<ortesis> Ortesis = new List<ortesis>();
            OrtopediaVelásquezEntities db = new OrtopediaVelásquezEntities();
            try
            {
                Ortesis = (from ortesis in db.ortesis
                           join t in db.tipoOrtesis on ortesis.tipo equals t.id
                           where ortesis.nombre.Contains(param)
                           select ortesis).ToList();
                return Ortesis;
            }
            catch (Exception e)
            {
                return null;
            }

        }//ObtenerOrtesisAsync

        public List<protesis> ObtenerProtesisAsync(String param)
        {
            List<protesis> Protesis = new List<protesis>();
            OrtopediaVelásquezEntities db = new OrtopediaVelásquezEntities();
            try
            {
                Protesis = (from protesis in db.protesis
                            join t in db.tipoProtesis on protesis.tipo equals t.id
                            where protesis.nombre.Contains(param)
                            select protesis).ToList();
                return Protesis;
            }
            catch (Exception e)
            {
                return null;
            }


        }//ObtenerProtesisAsync

        public protesis ObtenerProtesiAsync(int id)
        {
            OrtopediaVelásquezEntities db = new OrtopediaVelásquezEntities();
            try
            {
                protesis p = db.protesis.Find(id);
                return p;
            }
            catch (Exception e)
            {
                return null;
            }


        }//ObtenerProtesiAsync

        public ortesis ObtenerOrtesiAsync(int id)
        {
            OrtopediaVelásquezEntities db = new OrtopediaVelásquezEntities();
            try
            {
                ortesis o = db.ortesis.Find(id);
                return o;
            }
            catch (Exception e)
            {
                return null;
            }
        }//ObtenerOrtesiAsync

        public List<tipoOrtesis> ObtenerTiposOrtesisAsync(String param)
        {
             List<tipoOrtesis> TipoOrtesis = new List<tipoOrtesis>();
                OrtopediaVelásquezEntities db = new OrtopediaVelásquezEntities();
                try
                {
                TipoOrtesis = (from tipoOrtesis in db.tipoOrtesis
                               where tipoOrtesis.nombre.Contains(param)
                                   select tipoOrtesis).ToList();
                    return TipoOrtesis;
                }
                catch (Exception e)
                {
                    return null;
                }
        }//ObtenerTiposOrtesisAsync

        public List<tipoProtesis> ObtenerTiposProtesisAsync(String param)
        {
                List<tipoProtesis> TipoProtesis = new List<tipoProtesis>();
                OrtopediaVelásquezEntities db = new OrtopediaVelásquezEntities();
                try
                {
                    TipoProtesis = (from tipoProtesis in db.tipoProtesis
                                    where tipoProtesis.nombre.Contains(param)
                                    select tipoProtesis).ToList();
                    return TipoProtesis;

                }
                catch (Exception e)
                {
                    return null;
                }
        }//ObtenerTipoProtesisAsync

        public List<Horarios> ObtenerHorariosAsync(int id, int value) {
            List<Horarios> h = new List<Horarios>();
            try
            {
                OrtopediaVelásquezEntities db = new OrtopediaVelásquezEntities();
                h = (from horarios in db.Horarios
                     join dias in db.Dias on horarios.Dia equals dias.Id
                     join usuario in db.usuario on horarios.Ortopeda equals usuario.id
                     where horarios.Ortopeda.Value.Equals(id) && horarios.Dia.Value.Equals(value)
                    select horarios).ToList();
                return h;
            }
            catch (Exception e) {
                return null;
            }
        }//ObtenerHorariosAsync
        public List<Horarios> ObtenerHorariosAsync(int id)
        {
            List<Horarios> h = new List<Horarios>();
            try
            {
                OrtopediaVelásquezEntities db = new OrtopediaVelásquezEntities();
                h = (from horarios in db.Horarios
                     join dias in db.Dias on horarios.Dia equals dias.Id
                     join usuario in db.usuario on horarios.Ortopeda equals usuario.id
                     where horarios.Ortopeda.Value.Equals(id)
                    select horarios).ToList();
                return h;
            }
            catch (Exception e)
            {
                return null;
            }
        }//ObtenerHorariosAsync

        public bool AgregarHorario(int id, int dia, string hora) {
            try {
                OrtopediaVelásquezEntities db = new OrtopediaVelásquezEntities();
                Horarios h = (from horarios in db.Horarios
                              where horarios.Dia.Value.Equals(dia) && horarios.Hora.Equals(hora)
                              select horarios).FirstOrDefault();
                if (h != null) {
                    return false;
                }
                h = new Horarios();
                h.Ortopeda = id;
                h.Dia = dia;
                h.Hora = hora;
                db.Horarios.Add(h);
                db.SaveChanges();
                return true;
            } catch (Exception e) {
                return false;
            }
        }
        

    }//Clase
}//NameSpace