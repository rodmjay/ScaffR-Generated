#region credits
// ***********************************************************************
// Assembly	: DemoApplication.Infrastructure
// Author	: Rod Johnson
// Created	: 03-18-2013
// 
// Last Modified By : Rod Johnson
// Last Modified On : 03-28-2013
// ***********************************************************************
#endregion

using System;
using System.Collections.ObjectModel;
using System.Security.Claims;
using DemoApplication.Core.Model;

namespace DemoApplication.Infrastructure.Migrations
{
    #region

    using System.Data.Entity.Migrations;
    using Data;
    using Membership;

    #endregion

    #region

    

    #endregion

    internal sealed class Configuration : DbMigrationsConfiguration<DataContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(DataContext context)
        {
            var user = new User()
            {
                Id = 1,
                Email = "ckfrsys1@ideafortune.com",
                Username = "admin",
                FirstName = "Steve",
                LastName = "Kropf",
                LastLogin = DateTime.UtcNow,
                Gender = Gender.Male,
                Address = "123 Main ST",
                PhoneNumber = "555-555-5555",
                IsLoginAllowed = true,
                IsAccountClosed = false,
                IsAccountVerified = true,
                Created = DateTime.UtcNow,
                Tenant = "default",
                // password is "admin"
                HashedPassword = "FA00.ACHEhktjwC+lLMLKq0PZXYsnr9HreWXtgMY55xMDY4ctWYeyzGPxt2vGLEtOEX2SKA==",
                PasswordChanged = DateTime.UtcNow,
                FailedLoginCount = 0,
                LastUpdated = DateTime.UtcNow
            };

            user.Claims.Add(new UserClaim()
            {
                Type = ClaimTypes.Role,
                Value = "Admin"
            });

            user.Claims.Add(new UserClaim()
            {
                Type = ClaimTypes.Role,
                Value = "Super Admin"
            });

            var member = new User()
            {
                Id = 2,
                Email = "rodmjay@ideafortune.com",
                Username = "member",
                FirstName = "Rod",
                LastName = "Johnson",
                LastLogin = DateTime.UtcNow,
                Gender = Gender.Male,
                Address = "Admin address",
                PhoneNumber = "555-555-5555",
                IsLoginAllowed = true,
                IsAccountClosed = false,
                IsAccountVerified = true,
                Created = DateTime.UtcNow,
                Tenant = "default",
                // password is "admin"
                HashedPassword = "FA00.ACHEhktjwC+lLMLKq0PZXYsnr9HreWXtgMY55xMDY4ctWYeyzGPxt2vGLEtOEX2SKA==",
                PasswordChanged = DateTime.UtcNow,
                FailedLoginCount = 0,
                LastUpdated = DateTime.UtcNow
            };

            member.Claims.Add(new UserClaim()
            {
                Type = ClaimTypes.Role,
                Value = "Member"
            });

            var superAdmin = new User()
            {
                Id = 3,
                Email = "ckfrsys1+super@ideafortune.com",
                Username = "super",
                FirstName = "NSA",
                LastName = "Agent",
                LastLogin = DateTime.UtcNow,
                Gender = Gender.Male,
                Address = "Admin address",
                PhoneNumber = "555-555-5555",
                IsLoginAllowed = true,
                IsAccountClosed = false,
                IsAccountVerified = true,
                Created = DateTime.UtcNow,
                Tenant = "default",
                // password is "admin"
                HashedPassword = "FA00.ACHEhktjwC+lLMLKq0PZXYsnr9HreWXtgMY55xMDY4ctWYeyzGPxt2vGLEtOEX2SKA==",
                PasswordChanged = DateTime.UtcNow,
                FailedLoginCount = 0,
                LastUpdated = DateTime.UtcNow
            };

            superAdmin.Claims.Add(new UserClaim()
            {
                Type = ClaimTypes.Role,
                Value = "Super Admin"
            });

            var distributor = new Distributor()
            {
                Id=1,
                LastUpdated = DateTime.UtcNow,
                Created = DateTime.UtcNow
            };

            var profile = new Profile()
            {
                Id = 1,
                Name = "Default",
                Created = DateTime.UtcNow,
                LastUpdated = DateTime.UtcNow,
                DistributorId = 1,
                JoinDate = DateTime.UtcNow
            };

            var campaign = new Campaign()
            {
                Id = 1,
                Created = DateTime.UtcNow,
                LastUpdated = DateTime.UtcNow,
                Name = "Default Campaign",
                ProfileId = 1,
                Description = "Default Campaign used for testing purposes"
            };

            var contact = new Contact()
            {
                Id = 1,
                ProfileId = 1,
                FirstName = "Steve",
                LastName = "Kropf",
                OrgOrWorkName = "Christian Kropf",
                Email = "ckfrsys1@ideafortune.com",
                Created = DateTime.UtcNow,
                LastUpdated = DateTime.UtcNow
                
            };

            context.Users.AddOrUpdate(x=>x.Id,user);
            context.Users.AddOrUpdate(x => x.Id, member);
            context.Users.AddOrUpdate(x => x.Id, superAdmin);
            context.Distributors.AddOrUpdate(x => x.Id, distributor);
            context.Profiles.AddOrUpdate(x => x.Id, profile);
            context.Contacts.AddOrUpdate(x => x.Id, contact);
            context.Campaigns.AddOrUpdate(x => x.Id, campaign);

            context.SaveChanges();
        }
    }
}
