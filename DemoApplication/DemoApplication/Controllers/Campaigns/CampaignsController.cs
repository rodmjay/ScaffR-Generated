using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DemoApplication.Controllers.Campaigns
{
    public class CampaignsController : Controller
    {
        //
        // GET: /Campaigns/

        [Authorize(Roles = "Member")]
        public ActionResult Manager()
        {
            return View();
        }

    }
}
