using System.Web.Mvc;
using DemoApplication.Extensions.TempDataHelpers;
using DemoApplication.Models.Products;

namespace DemoApplication.Controllers.Products
{
    public partial class ProductsController
    {
        [HttpGet]
        public ActionResult Create()
        {
            return View(new CreateProductModel());
        }

        [HttpPost]
        public ActionResult Create(CreateProductModel model)
        {
            if (ModelState.IsValid)
            {
                TempData.AddSuccessMessage("Product was created successfully");
                return RedirectToAction("Manager");
            }
            return View(model);
        }
    }
}
