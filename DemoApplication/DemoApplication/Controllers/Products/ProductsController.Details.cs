using System.Web.Mvc;
using DemoApplication.Extensions.TempDataHelpers;
using DemoApplication.Models.Products;

namespace DemoApplication.Controllers.Products
{    
    public partial class ProductsController
    {        
        public ActionResult Details(int id)
        {
            return View();
        }
    }
}
