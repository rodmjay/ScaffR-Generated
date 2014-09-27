using System.Web.Mvc;

namespace DemoApplication.Controllers.Products
{
    [Authorize(Roles = "Admin,Super Admin")]
    public class ProductsController : Controller
    {
        //
        // GET: /Products/

        public ActionResult Manager()
        {
            return View();
        }

    }
}
