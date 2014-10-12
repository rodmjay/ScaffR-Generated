using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DemoApplication.Core.Interfaces.Data;
using DemoApplication.Core.Model;
using DemoApplication.Filters;
using DemoApplication.Models;
using DemoApplication.Models.Campaigns;

namespace DemoApplication.Controllers.Campaigns
{
    [Authorize(Roles = "Member,Admin,Super Admin")]
    public class CampaignsController : Controller
    {
        private readonly IRepository<Campaign> _campaignRepository;
        private readonly IRepository<Product> _productRepository;

        public CampaignsController(IRepository<Campaign> campaignRepository, IRepository<Product> productRepository)
        {
            _campaignRepository = campaignRepository;
            _productRepository = productRepository;
        }

        public ActionResult Manager()
        {
            var campaigns = _campaignRepository.GetAll().ToList();
            return View(campaigns);
        }

        public ActionResult Create()
        {
            var products = _productRepository.GetAll();
            var model = new CreateCampaignModel();
            model.Products = new Collection<ChooseProductViewModel>();

            foreach (var product in products)
            {
                model.Products.Add(new ChooseProductViewModel()
                {
                    Details = product.Description,
                    ProductName = product.Name,
                    Selected = false
                });
            }

            return View(model);
        }
    }
}
