using System.Web.Mvc;
using DemoApplication.Core.Interfaces.Service;
using DemoApplication.Extensions.ModelStateHelpers;
using DemoApplication.Extensions.TempDataHelpers;
using DemoApplication.Models.Organization;
using Omu.ValueInjecter;

namespace DemoApplication.Controllers.Organizations
{
    [Authorize(Roles = "Member,Admin,Super Admin")]
    public class OrganizationsController : Controller
    {
        private readonly IOrganizationService _organizationService;

        public OrganizationsController(IOrganizationService organizationService)
        {
            _organizationService = organizationService;
        }

        public ActionResult Index()
        {
            return View(new OrganizationListModel());
        }

        [HttpGet]
        public ActionResult Details(int id)
        {
            return View(new OrganizationDetailsModel());
        }

        [HttpPost]
        public ActionResult Details(OrganizationDetailsModel model)
        {
            return View();
        }

        public ActionResult Manager()
        {
            var org = _organizationService.GetById(1089);

            var model = new OrganizationViewModel();

            model.InjectFrom(org);

            return View(new OrganizationViewModel());
        }

        [HttpPost]
        public ActionResult Manager(OrganizationModel model)
        {
            if (ModelState.IsValid)
            {                
                var organization =_organizationService.UpdateOrganization(model.Name);
                if (ModelState.Process(organization))
                {
                    TempData.AddSuccessMessage("Item was successfully updated");
                    return RedirectToAction("Manager");
                }
            }
            return View(model);
        }

    }
}
