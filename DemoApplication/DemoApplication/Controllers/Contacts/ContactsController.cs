using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DemoApplication.Core.Interfaces.Data;
using DemoApplication.Core.Interfaces.Service;
using DemoApplication.Core.Model;

namespace DemoApplication.Controllers.Contacts
{
    [Authorize(Roles = "Member,Admin,Super Admin")]
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

        public ActionResult Create()
        {
            return View();
        }

    }
}
