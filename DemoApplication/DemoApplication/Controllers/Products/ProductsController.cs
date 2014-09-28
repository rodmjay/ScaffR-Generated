using System.Web.Mvc;
using DemoApplication.Core.Model;
using DemoApplication.Models;
using DemoApplication.Models.Products;

namespace DemoApplication.Controllers.Products
{
    [Authorize(Roles = "Admin,Super Admin")]
    public class ProductsController : Controller
    {
        public ActionResult Manager()
        {
            return View();
        }

        public ActionResult Create()
        {
            return View(new ProductInfo());
        }
    }
}
