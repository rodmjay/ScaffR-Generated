namespace DemoApplication.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddCampaignCode : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Org_Campaign", "Code", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Org_Campaign", "Code");
        }
    }
}
