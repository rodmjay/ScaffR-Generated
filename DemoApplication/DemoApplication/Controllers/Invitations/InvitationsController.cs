using System.Web.Mvc;
using DemoApplication.Models;
using DemoApplication.Models.Invitations;

namespace DemoApplication.Controllers.Invitations
{
    [Authorize(Roles = "Member,Super Admin")]
    public class InvitationsController : Controller
    {
        public ActionResult Index()
        {
            return View(new InvitationInfo());
        }
    }
}