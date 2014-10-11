#region credits

// ***********************************************************************
// Assembly	: DemoApplication
// Author	: Rod Johnson
// Created	: 02-24-2013
// 
// Last Modified By : Rod Johnson
// Last Modified On : 03-28-2013
// ***********************************************************************

#endregion

using System.Globalization;
using DemoApplication.Models.Organization;

namespace DemoApplication.Controllers.Account
{
    #region

    using System.ComponentModel.DataAnnotations;
    using System.Web.Mvc;
    using Core.Common.Membership;
    using Extensions.ModelStateHelpers;
    using Filters;
    using Models.Account;
    using Security.Authorization;

    #endregion

    /// <summary>
    /// Class AccountController
    /// </summary>
    public partial class AccountController
    {
        [AllowAnonymous, OnlyAnonymous, ShowMainMenu(false)]
        public ActionResult Register()
        {
            return View(new OrganizationRegistrationModel());
        }

        /// <summary>
        /// Registration form.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>ActionResult.</returns>
        [HttpPost, AllowAnonymous, OnlyAnonymous, ShowMainMenu(false)]
        public ActionResult Register(OrganizationRegistrationModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var org = _organizationService.CreateOrganization(
                        model.OrganizationProfileModel.Name,
                        model.OrganizationProfileModel.OrganizationType);

                    if (ModelState.Process(org))
                    {
                        var user = _userService.CreateAccount(
                            org.Entity.Id.ToString(CultureInfo.InvariantCulture),
                            model.UserRegistration.Username,
                            model.UserRegistration.Password,
                            model.UserRegistration.Email,
                            model.UserRegistration.FirstName,
                            model.UserRegistration.LastName,
                            model.UserRegistration.PhoneNumber,
                            model.UserRegistration.Address);

                        if (ModelState.Process(user))
                        {
                            new MembershipEvent(MembershipEventCode.UserCreated, user.Entity).Raise();

                            if (_membershipSettings.RequireAccountVerification)
                            {
                                return View("RegisterSuccess", model.UserRegistration);
                            }
                            return View("RegisterConfirm", true);
                        }
                    }
                }
                catch (ValidationException ex)
                {
                    ModelState.AddModelError("", ex.Message);
                }
            }
            return View(model);
        }

        /// <summary>
        /// Confirms a new registration
        /// </summary>
        /// <param name="id">The id.</param>
        /// <returns>ActionResult.</returns>
        [AllowAnonymous, OnlyAnonymous, ShowMainMenu(false)]
        public ActionResult Confirm(string id)
        {
            var result = _userService.VerifyAccount(id);
            return View("RegisterConfirm", result.IsValid);
        }

        /// <summary>
        /// Cancels an existing registration
        /// </summary>
        /// <param name="id">The id.</param>
        /// <returns>ActionResult.</returns>
        [AllowAnonymous, OnlyAnonymous, ShowMainMenu(false)]
        public ActionResult Cancel(string id)
        {
            var result = _userService.CancelNewAccount(id);
            return View("RegisterCancel", result);
        }
    }
}