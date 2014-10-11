namespace DemoApplication.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class RemovedNavigationPropertyDistributorOrganization : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Org_Control", "Distributor_ID", "dbo.Distributors");
            DropIndex("dbo.Org_Control", new[] {"Distributor_ID"});
        }

        public override void Down()
        {
            CreateIndex("dbo.Org_Control", "Distributor_ID");
            AddForeignKey("dbo.Org_Control", "Distributor_ID", "dbo.Distributors", "Id", cascadeDelete: true);
        }
    }
}