using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SitioWebOrtopediaVelásquez.Servicios
{
    class CatalogoServicio
    {
        public List<ortesis> ObtenerOrtesisAsync(String param) {

            List<ortesis> Ortesis = new List<ortesis>();
               OrtopediaVelásquezEntities db = new OrtopediaVelásquezEntities();
               try {
                   Ortesis = (from ortesis in db.ortesis
                              join t in db.tipoOrtesis on ortesis.tipo equals t.id
                              where ortesis.nombre.Contains(param)
                              select ortesis).ToList();
                   return Ortesis;
               }
               catch (Exception e) {
                   return null;
               }
            
        }//ObtenerOrtesisAsync

        public List<protesis> ObtenerProtesisAsync(String param) {
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

        public Task<List<tipoOrtesis>> ObtenerTiposOrtesisAsync(String param) {

            return Task.Run(() =>
            {
                List<tipoOrtesis> TipoOrtesis = new List<tipoOrtesis>();
                OrtopediaVelásquezEntities db = new OrtopediaVelásquezEntities();
                try {
                    TipoOrtesis = (from tipoOrtesis in db.tipoOrtesis
                                   where tipoOrtesis.nombre.Contains(param)
                                   select tipoOrtesis).ToList();
                    return TipoOrtesis;
                }
                catch (Exception e) {
                    return null;
                }
            });
        }//ObtenerTiposOrtesisAsync

        public Task<List<tipoProtesis>> ObtenerTiposProtesisAsync(String param)
        {

            return Task.Run(() =>
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

            });
        }//ObtenerTipoProtesisAsync

    }//Clase
}//NameSpace
