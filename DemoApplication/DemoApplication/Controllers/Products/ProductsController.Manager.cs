using System.Web.Mvc;
using DemoApplication.Core.Interfaces.Service;
using DemoApplication.Core.Model;

namespace DemoApplication.Controllers.Products
{
    [Authorize(Roles = "Super Admin")]
    public partial class ProductsController : Controller
    {
        private readonly IService<Product> _productService;

        public ProductsController(IService<Product> productService)
        {
            _productService = productService;
        }

        public ActionResult Manager()
        {
            return View();
        }
    }
}
