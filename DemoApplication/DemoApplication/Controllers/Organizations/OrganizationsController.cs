using System.Web.Mvc;

namespace DemoApplication.Controllers.Organizations
{
    [Authorize(Roles = "Member,Admin,Super Admin")]
    public class OrganizationsController : Controller
    {
        public ActionResult Manager()
        {
            return View();
        }

    }
}
