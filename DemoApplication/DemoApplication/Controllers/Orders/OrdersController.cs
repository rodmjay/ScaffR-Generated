using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DemoApplication.Controllers.Orders
{
    [Authorize(Roles = "Admin,Super Admin,Member")]
    public class OrdersController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
