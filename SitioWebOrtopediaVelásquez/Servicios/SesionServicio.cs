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
                    var result = (from paciente in db.paciente
                                  where paciente.email.Equals(email)
                                  select paciente).ToList();
                    if (result.Count() == 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                catch
                {
                    return false;
                }

            }
        }//Check Email
        public bool RegistarPaciente(paciente p) {
            using (OrtopediaVelásquezEntities db = new OrtopediaVelásquezEntities()) {
                try
                {
                    db.paciente.Add(p);
                    db.SaveChanges();
                    return true;
                }
                catch (Exception e) {
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
                    var result = (from data in db.paciente
                                  where data.email.Equals(email) && data.contrasenya.Equals(password)
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
}