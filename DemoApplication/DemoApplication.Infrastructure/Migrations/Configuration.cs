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
            new MembershipDataSeeder().Seed(context);

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

            var contact = new Contact()
            {
                Id = 1,
                ProfileId = 1,
                FirstName = "Rod",
                LastName = "Johnson",
                OrgOrWorkName = "Christian Kropf",
                Email = "rod@ideafortune.com",
                Created = DateTime.UtcNow,
                LastUpdated = DateTime.UtcNow
                
            };

            context.Distributors.AddOrUpdate(x => x.Id, distributor);
            context.Profiles.AddOrUpdate(x => x.Id, profile);
            context.Contacts.AddOrUpdate(x=>x.Id, contact);
            context.SaveChanges();
        }
    }
}
