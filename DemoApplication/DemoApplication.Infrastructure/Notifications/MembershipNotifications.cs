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

namespace DemoApplication.Infrastructure.Notifications
{
    #region

    using Core.Interfaces.Notifications;
    using Core.Model;

    #endregion

    public class MembershipNotifications : INotificationService
    {
        private readonly MailerController _controller;

        public MembershipNotifications()
        {
            _controller = new MailerController();
        }

        public void SendAccountCreate(User user)
        {
            _controller.SendAccountCreate(user).Deliver();
        }

        public void SendAccountVerified(User user)
        {
            _controller.SendAccountVerified(user).Deliver();
        }

        public void SendResetPassword(User user)
        {
            _controller.SendPasswordReset(user).Deliver();
        }

        public void SendPasswordChangeNotice(User user)
        {
            _controller.SendPasswordChangeNotice(user).Deliver();
        }

        public void SendAccountNameReminder(User user)
        {
            _controller.SendAccountNameReminder(user).Deliver();
        }

        public void SendAccountDelete(User user)
        {
            _controller.SendAccountDelete(user).Deliver();
        }

        public void SendChangeEmailRequestNotice(User user, string newEmail)
        {
            _controller.SendChangeEmailRequestNotice(user).Deliver();
        }

        public void SendEmailChangedNotice(User user, string oldEmail)
        {
            _controller.SendEmailChangedNotice(user).Deliver();
        }
    }
}