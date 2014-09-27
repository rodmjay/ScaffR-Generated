#region credits
// ***********************************************************************
// Assembly	: DemoApplication.Infrastructure
// Author	: Rod Johnson
// Created	: 03-16-2013
// 
// Last Modified By : Rod Johnson
// Last Modified On : 03-28-2013
// ***********************************************************************
#endregion
namespace DemoApplication.Infrastructure.Data
{
    #region

    using System.Data.Entity;
    using Core.Model;

    #endregion

    public partial class DataContext : BaseContext<DataContext>
    {
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Log> Log { get; set; }
        public virtual DbSet<Campaign> Campaigns { get; set; }
        public virtual DbSet<Profile> Profiles { get; set; }
        public virtual DbSet<Membership> Members { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<Shopper> Shoppers { get; set; }
        public virtual DbSet<ItemContents> ItemContents { get; set; }
        public virtual DbSet<Contact> Contacts { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Distributor> Distributors { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Organization>().ToTable("Org_Control");
            modelBuilder.Entity<Profile>().ToTable("Org_Profile");
            modelBuilder.Entity<Vendor>().ToTable("Vendor");
        }
    }    
}