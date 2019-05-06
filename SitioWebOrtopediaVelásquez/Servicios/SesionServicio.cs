using Newtonsoft.Json;
using System;
using System.Linq;

namespace SitioWebOrtopediaVelásquez.Servicios
{
    public class SesionServicio
    {
        public bool CheckEmail(string email)
        {
            using (OrtopediaVelásquezEntities db = new OrtopediaVelásquezEntities())
            {
                try
                {
                    var result = (from paciente in db.usuario
                                  where paciente.email.Equals(email) && (paciente.tipoUsuario.Value.Equals(3) || paciente.tipoUsuario.Value.Equals(2))
                                  select paciente).ToList();
                    if (result.Count() == 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                catch
                {
                    return false;
                }

            }
        }//Check Email
        public bool RegistarPaciente(usuario p)
        {
            using (OrtopediaVelásquezEntities db = new OrtopediaVelásquezEntities())
            {
                try
                {
                    db.usuario.Add(p);
                    db.SaveChanges();
                    return true;
                }
                catch (Exception e)
                {
                    return false;
                }

            }

        }//RegistrarPaciente

        public string ComprobarLogin(string email, string password)
        {
            using (OrtopediaVelásquezEntities db = new OrtopediaVelásquezEntities())
            {
                LoginData loginData = new LoginData();
                try
                {
                    var result = (from data in db.usuario
                                  where data.email.Equals(email) && data.contrasenya.Equals(password) && (data.tipoUsuario.Value.Equals(3) || data.tipoUsuario.Value.Equals(2))
                                  select data).ToList();


                    if (result.Count() == 0)
                    {
                        loginData.ValidData = false;
                        return JsonConvert.SerializeObject(loginData);
                    }
                    else
                    {
                        loginData.ValidData = true;
                        loginData.Nombre = result[0].nombres;
                        loginData.Email = result[0].email;
                        loginData.id = result[0].id;
                        loginData.TipoUsuario = (int) result[0].tipoUsuario;
                        return JsonConvert.SerializeObject(loginData);
                    }
                }
                catch
                {
                    loginData.ValidData = false;
                    return JsonConvert.SerializeObject(loginData);
                }

            }
        }//ComprobarLogin

    }//Clase
}//NameSpace

public class LoginData
{
    public bool ValidData { get; set; }
    public string Nombre { get; set; }
    public string Email { get; set; }
    public int id { get; set; }
    public int TipoUsuario { get; set; }
}