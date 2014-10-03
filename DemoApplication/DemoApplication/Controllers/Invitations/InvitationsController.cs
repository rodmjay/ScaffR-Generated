using System.Web.Mvc;
using DemoApplication.Extensions.TempDataHelpers;
using DemoApplication.Models;
using DemoApplication.Models.Invitations;

namespace DemoApplication.Controllers.Invitations
{
    [Authorize(Roles = "Member,Super Admin")]
    public class InvitationsController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            return View(new InvitationModel());
        }

        [HttpPost]
        public ActionResult Index(InvitationModel model)
        {
            if (ModelState.IsValid)
            {
                TempData.AddSuccessMessage("The invitation was sent");
                return RedirectToAction("Manager", "Users");
            }
            return View(model);
        }
    }
}
