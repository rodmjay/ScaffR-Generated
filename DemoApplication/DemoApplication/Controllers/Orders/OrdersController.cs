using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DemoApplication.Extensions.TempDataHelpers;
using DemoApplication.Models.Orders;

namespace DemoApplication.Controllers.Orders
{
    [Authorize(Roles = "Admin,Member")]
    public class OrdersController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Create()
        {
            return View(new CreateOrderModel());
        }

        [HttpPost]
        public ActionResult Create(CreateOrderModel model)
        {
            if (ModelState.IsValid)
            {
                TempData.AddSuccessMessage("Order was created successfully");
                return RedirectToAction("Index");
            }
            return View(model);
        }
    }
}
