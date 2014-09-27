namespace DemoApplication.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemovedExplicitRelationshipFromContactForAddresses : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Org_Contact", "Contact_Address_ID", "dbo.Addresses");
            DropForeignKey("dbo.Org_Contact", "Billing_Address_ID", "dbo.Addresses");
            DropForeignKey("dbo.Org_Contact", "Org_Or_Work_Address_ID", "dbo.Addresses");
            DropForeignKey("dbo.Org_Contact", "Shipping_Address_ID", "dbo.Addresses");
            DropIndex("dbo.Org_Contact", new[] { "Contact_Address_ID" });
            DropIndex("dbo.Org_Contact", new[] { "Billing_Address_ID" });
            DropIndex("dbo.Org_Contact", new[] { "Shipping_Address_ID" });
            DropIndex("dbo.Org_Contact", new[] { "Org_Or_Work_Address_ID" });
            DropTable("dbo.Addresses");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Addresses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Address_Type = c.Int(nullable: false),
                        Address_1 = c.String(),
                        Address_2 = c.String(),
                        City = c.String(),
                        State = c.String(),
                        Country = c.String(),
                        Zip = c.String(),
                        Residential = c.Boolean(nullable: false),
                        Record_Created = c.DateTime(nullable: false),
                        Last_Modified = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateIndex("dbo.Org_Contact", "Org_Or_Work_Address_ID");
            CreateIndex("dbo.Org_Contact", "Shipping_Address_ID");
            CreateIndex("dbo.Org_Contact", "Billing_Address_ID");
            CreateIndex("dbo.Org_Contact", "Contact_Address_ID");
            AddForeignKey("dbo.Org_Contact", "Shipping_Address_ID", "dbo.Addresses", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Org_Contact", "Org_Or_Work_Address_ID", "dbo.Addresses", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Org_Contact", "Billing_Address_ID", "dbo.Addresses", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Org_Contact", "Contact_Address_ID", "dbo.Addresses", "Id", cascadeDelete: true);
        }
    }
}
