namespace DemoApplication.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedProductNameDescriptionAndImageUrl : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Item_Control", "Name", c => c.String());
            AddColumn("dbo.Item_Control", "Description", c => c.String());
            AddColumn("dbo.Item_Control", "ImageUrl", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Item_Control", "ImageUrl");
            DropColumn("dbo.Item_Control", "Description");
            DropColumn("dbo.Item_Control", "Name");
        }
    }
}
