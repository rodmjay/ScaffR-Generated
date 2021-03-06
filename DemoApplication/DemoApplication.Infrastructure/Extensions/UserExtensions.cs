﻿#region credits

// ***********************************************************************
// Assembly	: DemoApplication.Infrastructure
// Author	: Rod Johnson
// Created	: 03-26-2013
// 
// Last Modified By : Rod Johnson
// Last Modified On : 03-28-2013
// ***********************************************************************

#endregion

namespace DemoApplication.Infrastructure.Extensions
{
    #region

    using System.Web;
    using System.Web.Mvc;
    using System.Web.Routing;
    using Core.Model;

    #endregion

    public static class UserExtensions
    {
        private static UrlHelper UrlHelper
        {
            get
            {
                if (HttpContext.Current.Items["UrlHelper"] == null)
                {
                    RequestContext ctx;
                    if (HttpContext.Current.Handler is MvcHandler)
                        ctx = ((MvcHandler) HttpContext.Current.Handler).RequestContext;
                    else
                        ctx = new RequestContext(new HttpContextWrapper(HttpContext.Current), new RouteData());

                    HttpContext.Current.Items["UrlHelper"] = new UrlHelper(ctx);
                }
                return (UrlHelper) HttpContext.Current.Items["UrlHelper"];
            }
        }

        private static string BuildUrl(User user, string action, string controller, object routeValues = null)
        {
            if (UrlHelper.RequestContext.HttpContext.Request.Url != null)
            {
                string scheme = UrlHelper.RequestContext.HttpContext.Request.Url.Scheme;
                return UrlHelper.Action(action, controller, routeValues, scheme);
            }
            return null;
        }

        public static string VerificationUrl(this User user)
        {
            return BuildUrl(user, "Confirm", "Account", new {id = user.VerificationKey});
        }

        public static string LoginUrl(this User user)
        {
            return BuildUrl(user, "Login", "Account");
        }

        public static string PasswordResetUrl(this User user)
        {
            return BuildUrl(user, "PasswordResetConfirm", "Account", new {id = user.VerificationKey});
        }
    }
}