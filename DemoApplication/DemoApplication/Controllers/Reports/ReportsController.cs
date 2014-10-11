using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DemoApplication.Controllers.Reports
{
    [Authorize(Roles = "Admin,Super Admin,Member")]
    public class ReportsController : Controller
    {
        //
        // GET: /Reports/

        public ActionResult Manager()
        {
            return View();
        }
    }
}