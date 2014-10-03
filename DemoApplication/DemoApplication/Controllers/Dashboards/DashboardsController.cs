using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DemoApplication.Controllers.Dashboards
{
    public class DashboardsController : Controller
    {
        [ChildActionOnly]
        public ActionResult Index()
        {
            return View();
        }

        [ChildActionOnly]
        public ActionResult AdminDashboard()
        {
            return View();
        }

        public ActionResult MemberDashboard()
        {
            return View();
        }

        public ActionResult SuperDashboard()
        {
            return View();
        }
    }
}
