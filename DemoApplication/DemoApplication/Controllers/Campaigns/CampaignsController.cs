using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DemoApplication.Core.Interfaces.Data;
using DemoApplication.Core.Model;
using DemoApplication.Filters;

namespace DemoApplication.Controllers.Campaigns
{
    [Authorize(Roles = "Member,Admin,Super Admin")]
    public class CampaignsController : Controller
    {
        private readonly IRepository<Campaign> _campaignRepository;

        public CampaignsController(IRepository<Campaign> campaignRepository)
        {
            _campaignRepository = campaignRepository;
        }

        //
        // GET: /Campaigns/


        public ActionResult Manager()
        {
            var campaigns = _campaignRepository.GetAll().ToList();
            return View(campaigns);
        }

        [ShowBreadcrumb(true)]
        public ActionResult Create()
        {
            return View(new CampaignInfo());
        }
    }
}
