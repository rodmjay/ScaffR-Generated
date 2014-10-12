namespace DemoApplication.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemovedComplexRelationshipsWithProduct : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Item_Control", "Contents_ID", "dbo.Item_Contents");
            DropIndex("dbo.Item_Control", new[] { "Contents_ID" });
            RenameColumn(table: "dbo.Item_Control", name: "Contents_ID", newName: "ItemContents_Id");
            AlterColumn("dbo.Item_Control", "ItemContents_Id", c => c.Int());
            CreateIndex("dbo.Item_Control", "ItemContents_Id");
            AddForeignKey("dbo.Item_Control", "ItemContents_Id", "dbo.Item_Contents", "Contents_ID");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Item_Control", "ItemContents_Id", "dbo.Item_Contents");
            DropIndex("dbo.Item_Control", new[] { "ItemContents_Id" });
            AlterColumn("dbo.Item_Control", "ItemContents_Id", c => c.Int(nullable: false));
            RenameColumn(table: "dbo.Item_Control", name: "ItemContents_Id", newName: "Contents_ID");
            CreateIndex("dbo.Item_Control", "Contents_ID");
            AddForeignKey("dbo.Item_Control", "Contents_ID", "dbo.Item_Contents", "Contents_ID", cascadeDelete: true);
        }
    }
}
