using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DemoApplication.Core.Interfaces.Data;
using DemoApplication.Core.Interfaces.Service;
using DemoApplication.Core.Model;
using DemoApplication.Extensions.TempDataHelpers;
using DemoApplication.Models.Contacts;

namespace DemoApplication.Controllers.Contacts
{
    [Authorize(Roles = "Member,Admin")]
    public class ContactsController : Controller
    {
        private readonly IRepository<Contact> _contactService;

        public ContactsController(IRepository<Contact> contactService)
        {
            _contactService = contactService;
        }

        //
        // GET: /Contacts/

        public ActionResult Index()
        {
            var list = _contactService.GetAll().ToList();

            return View(list);
        }

        public ActionResult Import()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(ContactModel model)
        {
            if (ModelState.IsValid)
            {
                TempData.AddSuccessMessage("Contact was created successfully");
                return RedirectToAction("Index");
            }
            return View(model);
        }
    }
}
