﻿#region credits

// ***********************************************************************
// Assembly	: DemoApplication
// Author	: Rod Johnson
// Created	: 03-17-2013
// 
// Last Modified By : Rod Johnson
// Last Modified On : 03-28-2013
// ***********************************************************************

#endregion

namespace DemoApplication.Controllers.Users
{
    #region

    using System.Linq;
    using System.Web.Mvc;
    using Models.Users;
    using Omu.ValueInjecter;

    #endregion

    public partial class UsersController
    {
        /// <summary>
        /// Histories the specified id.
        /// </summary>
        /// <param name="id">The id.</param>
        /// <returns>ActionResult.</returns>
        [HttpGet]
        public ActionResult History(int id)
        {
            var user = UserService.GetByID(id);

            var model = new UserHistory();
            model.InjectFrom<UnflatLoopValueInjection>(user);
            model.Username = user.Username;

            model.Logs =
                _logging.Find(x => x.Username == user.Username && x.Tenant == user.Tenant)
                    .OrderByDescending(x => x.Created)
                    .ToList();

            return View(model);
        }
    }
}