namespace DemoApplication.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Fundraiser_Origin : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.UserClaims", "UserId", "dbo.Users");
            RenameColumn(table: "dbo.Users", name: "Created", newName: "Record_Created");
            RenameColumn(table: "dbo.Logs", name: "Created", newName: "Record_Created");
            CreateTable(
                "dbo.Org_Campaign",
                c => new
                    {
                        Campaign_ID = c.Int(nullable: false, identity: true),
                        Campaign_Status = c.Int(nullable: false),
                        Campaign_Name = c.String(),
                        Description = c.String(),
                        Set_Profit_Flat = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Set_Profit_Margin = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Standard_Campaign = c.Boolean(nullable: false),
                        StandardCampaignTemplate = c.String(),
                        Sales_Goal = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Purpose_of_Funds = c.String(),
                        Make_Checks_Payable_To = c.String(),
                        Campaign_Chairperson = c.Int(nullable: false),
                        Kick_Off_Meeting = c.DateTime(),
                        Sale_Start = c.DateTime(),
                        Sale_End = c.DateTime(),
                        Pre_Order_Deadline = c.DateTime(),
                        Delivery_Time = c.DateTime(),
                        Alternate_Delivery = c.DateTime(),
                        Pick_Up_Location = c.String(),
                        Brochure_Template = c.String(),
                        Published_Content_ID = c.String(),
                        Media_Page_ID = c.String(),
                        Web_Only = c.Boolean(nullable: false),
                        Admin_Approval_Date = c.DateTime(),
                        ProfileId = c.Int(nullable: false),
                        Record_Created = c.DateTime(nullable: false),
                        Last_Modified = c.DateTime(),
                    })
                .PrimaryKey(t => t.Campaign_ID)
                .ForeignKey("dbo.Org_Profile", t => t.ProfileId)
                .Index(t => t.ProfileId);
            
            CreateTable(
                "dbo.Org_Campaign_Details",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Campaign_ID = c.Int(nullable: false),
                        Record_Created = c.DateTime(nullable: false),
                        Last_Modified = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Org_Campaign", t => t.Campaign_ID, cascadeDelete: true)
                .Index(t => t.Campaign_ID);
            
            CreateTable(
                "dbo.Org_Contact",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Profile_ID = c.Int(nullable: false),
                        Title = c.String(),
                        Gender = c.Int(nullable: false),
                        Member_Email = c.String(),
                        FirstName = c.String(nullable: false, maxLength: 15),
                        LastName = c.String(nullable: false, maxLength: 25),
                        Contact_Address_ID = c.Int(nullable: false),
                        Billing_Address_ID = c.Int(nullable: false),
                        Shipping_Address_ID = c.Int(nullable: false),
                        Org_Or_Work_Name = c.String(),
                        Org_Or_Work_Address_ID = c.Int(nullable: false),
                        StateId = c.Int(nullable: false),
                        City = c.String(),
                        Zipcode = c.String(),
                        HomePhone = c.String(),
                        CellPhone = c.String(),
                        WorkPhone = c.String(),
                        PhoneExt = c.String(),
                        Fax = c.String(),
                        BestTimeToCallId = c.Int(nullable: false),
                        SocialMedia1 = c.String(),
                        SocialMedia2 = c.String(),
                        SocialMedia3 = c.String(),
                        SocialMedia4 = c.String(),
                        SocialMedia5 = c.String(),
                        WebPage = c.String(),
                        ReferredBy = c.String(),
                        Record_Created = c.DateTime(nullable: false),
                        Last_Modified = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Addresses", t => t.Contact_Address_ID, cascadeDelete: false)
                .ForeignKey("dbo.Addresses", t => t.Billing_Address_ID, cascadeDelete: false)
                .ForeignKey("dbo.Addresses", t => t.Org_Or_Work_Address_ID, cascadeDelete: false)
                .ForeignKey("dbo.Org_Profile", t => t.Profile_ID)
                .ForeignKey("dbo.Addresses", t => t.Shipping_Address_ID, cascadeDelete: false)
                .Index(t => t.Profile_ID)
                .Index(t => t.Contact_Address_ID)
                .Index(t => t.Billing_Address_ID)
                .Index(t => t.Shipping_Address_ID)
                .Index(t => t.Org_Or_Work_Address_ID);
            
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
            
            CreateTable(
                "dbo.Invoice",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Invoice_Status = c.Int(nullable: false),
                        Invoice_Date = c.DateTime(nullable: false),
                        Amount_Due = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Due_Date = c.DateTime(nullable: false),
                        Paid_Amount = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Invoice_Contact_ID = c.Int(nullable: false),
                        Record_Created = c.DateTime(nullable: false),
                        Last_Modified = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Org_Contact", t => t.Invoice_Contact_ID, cascadeDelete: true)
                .Index(t => t.Invoice_Contact_ID);
            
            CreateTable(
                "dbo.Org_Control",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Org_Type = c.Int(nullable: false),
                        Org_Status = c.Int(nullable: false),
                        Campaign_ID = c.Int(nullable: false),
                        Distributor_ID = c.Int(nullable: false),
                        Email_Validated = c.Boolean(nullable: false),
                        Record_Created = c.DateTime(nullable: false),
                        Last_Modified = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Distributors", t => t.Distributor_ID, cascadeDelete: true)
                .Index(t => t.Distributor_ID);
            
            CreateTable(
                "dbo.Distributors",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Record_Created = c.DateTime(nullable: false),
                        Last_Modified = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Org_Orders",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Order_Type = c.String(),
                        Invoice_Number = c.String(),
                        Order_Date = c.DateTime(nullable: false),
                        Order_Details = c.String(),
                        Campaign_ID = c.Int(nullable: false),
                        Profile_ID = c.Int(nullable: false),
                        Member_ID = c.Int(nullable: false),
                        Shopper_ID = c.Int(nullable: false),
                        Customer_Ourchase_Order_No = c.String(),
                        Order_Status = c.Int(nullable: false),
                        Order_Instructions = c.String(),
                        Order_Log = c.String(),
                        Record_Created = c.DateTime(nullable: false),
                        Last_Modified = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Org_Campaign", t => t.Campaign_ID, cascadeDelete: true)
                .ForeignKey("dbo.Org_Members", t => t.Member_ID)
                .ForeignKey("dbo.Shoppers", t => t.Shopper_ID)
                .ForeignKey("dbo.Org_Profile", t => t.Profile_ID)
                .Index(t => t.Campaign_ID)
                .Index(t => t.Profile_ID)
                .Index(t => t.Member_ID)
                .Index(t => t.Shopper_ID);
            
            CreateTable(
                "dbo.Org_Order_Details",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        OrderId = c.Int(nullable: false),
                        Item_Control_ID = c.Int(nullable: false),
                        Item_Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Item_Quantity = c.Int(nullable: false),
                        Discount_Code = c.String(),
                        Item_Detail_Instructions = c.String(),
                        Item_Status = c.Int(nullable: false),
                        Record_Created = c.DateTime(nullable: false),
                        Last_Modified = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Item_Control", t => t.Item_Control_ID, cascadeDelete: true)
                .ForeignKey("dbo.Org_Orders", t => t.OrderId, cascadeDelete: true)
                .Index(t => t.OrderId)
                .Index(t => t.Item_Control_ID);
            
            CreateTable(
                "dbo.Item_Control",
                c => new
                    {
                        Item_Control_ID = c.Int(nullable: false, identity: true),
                        Contents_ID = c.Int(nullable: false),
                        Record_Created = c.DateTime(nullable: false),
                        Last_Modified = c.DateTime(),
                    })
                .PrimaryKey(t => t.Item_Control_ID)
                .ForeignKey("dbo.Item_Contents", t => t.Contents_ID, cascadeDelete: true)
                .Index(t => t.Contents_ID);
            
            CreateTable(
                "dbo.Inventory",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Item_Control = c.Int(nullable: false),
                        Vendor_ID = c.Int(nullable: false),
                        Purchase_Number = c.String(),
                        Purchase_Qty = c.Int(nullable: false),
                        Record_Created = c.DateTime(nullable: false),
                        Last_Modified = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Item_Control", t => t.Item_Control, cascadeDelete: true)
                .ForeignKey("dbo.Vendor", t => t.Vendor_ID)
                .Index(t => t.Item_Control)
                .Index(t => t.Vendor_ID);
            
            CreateTable(
                "dbo.Item_Contents",
                c => new
                    {
                        Contents_ID = c.Int(nullable: false, identity: true),
                        Quantity = c.Int(nullable: false),
                        Pieces_Count = c.Int(nullable: false),
                        Pieces_Weight = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Item_Code = c.String(),
                        Record_Created = c.DateTime(nullable: false),
                        Last_Modified = c.DateTime(),
                    })
                .PrimaryKey(t => t.Contents_ID);
            
            CreateTable(
                "dbo.Shipping_Control",
                c => new
                    {
                        Shipment_Number = c.Int(nullable: false, identity: true),
                        Order_Detail_Number = c.Int(nullable: false),
                        Shopper_ID = c.Int(nullable: false),
                        Record_Created = c.DateTime(nullable: false),
                        Last_Modified = c.DateTime(),
                    })
                .PrimaryKey(t => t.Shipment_Number)
                .ForeignKey("dbo.Org_Order_Details", t => t.Order_Detail_Number, cascadeDelete: true)
                .ForeignKey("dbo.Shoppers", t => t.Shopper_ID)
                .Index(t => t.Order_Detail_Number)
                .Index(t => t.Shopper_ID);
            
            CreateTable(
                "dbo.Payments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Record_Created = c.DateTime(nullable: false),
                        Last_Modified = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Org_Members",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Profile_Id = c.Int(),
                        Member_Status = c.Int(nullable: false),
                        Org_ID = c.Int(nullable: false),
                        Email_Validated = c.Boolean(nullable: false),
                        Contact_ID = c.Int(),
                        Member_Type = c.Int(nullable: false),
                        Member_Record_No = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Org_Contact", t => t.Id)
                .ForeignKey("dbo.Org_Profile", t => t.Profile_Id)
                .Index(t => t.Id)
                .Index(t => t.Profile_Id);
            
            CreateTable(
                "dbo.Org_Profile",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Join_Date = c.DateTime(nullable: false),
                        AdminId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Org_Control", t => t.Id)
                .Index(t => t.Id);
            
            CreateTable(
                "dbo.Shoppers",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Profile_Id = c.Int(),
                        PaymentId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Org_Contact", t => t.Id)
                .ForeignKey("dbo.Org_Profile", t => t.Profile_Id)
                .ForeignKey("dbo.Payments", t => t.PaymentId, cascadeDelete: true)
                .Index(t => t.Id)
                .Index(t => t.Profile_Id)
                .Index(t => t.PaymentId);
            
            CreateTable(
                "dbo.Vendor",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Vendor_Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Org_Contact", t => t.Id)
                .Index(t => t.Id);
            
            AddColumn("dbo.Users", "Last_Modified", c => c.DateTime());
            AddColumn("dbo.Logs", "Last_Modified", c => c.DateTime());
            AlterColumn("dbo.Users", "Record_Created", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Logs", "Record_Created", c => c.DateTime(nullable: false));
            AddForeignKey("dbo.UserClaims", "UserId", "dbo.Users", "Id", cascadeDelete: true);
            DropColumn("dbo.Users", "Updated");
            DropColumn("dbo.Logs", "Updated");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Logs", "Updated", c => c.DateTime());
            AddColumn("dbo.Users", "Updated", c => c.DateTime());
            DropForeignKey("dbo.UserClaims", "UserId", "dbo.Users");
            DropForeignKey("dbo.Vendor", "Id", "dbo.Org_Contact");
            DropForeignKey("dbo.Shoppers", "PaymentId", "dbo.Payments");
            DropForeignKey("dbo.Shoppers", "Profile_Id", "dbo.Org_Profile");
            DropForeignKey("dbo.Shoppers", "Id", "dbo.Org_Contact");
            DropForeignKey("dbo.Org_Profile", "Id", "dbo.Org_Control");
            DropForeignKey("dbo.Org_Members", "Profile_Id", "dbo.Org_Profile");
            DropForeignKey("dbo.Org_Members", "Id", "dbo.Org_Contact");
            DropForeignKey("dbo.Org_Control", "Distributor_ID", "dbo.Distributors");
            DropForeignKey("dbo.Org_Contact", "Shipping_Address_ID", "dbo.Addresses");
            DropForeignKey("dbo.Org_Orders", "Profile_ID", "dbo.Org_Profile");
            DropForeignKey("dbo.Org_Order_Details", "OrderId", "dbo.Org_Orders");
            DropForeignKey("dbo.Shipping_Control", "Shopper_ID", "dbo.Shoppers");
            DropForeignKey("dbo.Org_Orders", "Shopper_ID", "dbo.Shoppers");
            DropForeignKey("dbo.Shipping_Control", "Order_Detail_Number", "dbo.Org_Order_Details");
            DropForeignKey("dbo.Org_Order_Details", "Item_Control_ID", "dbo.Item_Control");
            DropForeignKey("dbo.Item_Control", "Contents_ID", "dbo.Item_Contents");
            DropForeignKey("dbo.Inventory", "Vendor_ID", "dbo.Vendor");
            DropForeignKey("dbo.Inventory", "Item_Control", "dbo.Item_Control");
            DropForeignKey("dbo.Org_Orders", "Member_ID", "dbo.Org_Members");
            DropForeignKey("dbo.Org_Orders", "Campaign_ID", "dbo.Org_Campaign");
            DropForeignKey("dbo.Org_Contact", "Profile_ID", "dbo.Org_Profile");
            DropForeignKey("dbo.Org_Campaign", "ProfileId", "dbo.Org_Profile");
            DropForeignKey("dbo.Org_Contact", "Org_Or_Work_Address_ID", "dbo.Addresses");
            DropForeignKey("dbo.Invoice", "Invoice_Contact_ID", "dbo.Org_Contact");
            DropForeignKey("dbo.Org_Contact", "Billing_Address_ID", "dbo.Addresses");
            DropForeignKey("dbo.Org_Contact", "Contact_Address_ID", "dbo.Addresses");
            DropForeignKey("dbo.Org_Campaign_Details", "Campaign_ID", "dbo.Org_Campaign");
            DropIndex("dbo.Vendor", new[] { "Id" });
            DropIndex("dbo.Shoppers", new[] { "PaymentId" });
            DropIndex("dbo.Shoppers", new[] { "Profile_Id" });
            DropIndex("dbo.Shoppers", new[] { "Id" });
            DropIndex("dbo.Org_Profile", new[] { "Id" });
            DropIndex("dbo.Org_Members", new[] { "Profile_Id" });
            DropIndex("dbo.Org_Members", new[] { "Id" });
            DropIndex("dbo.Shipping_Control", new[] { "Shopper_ID" });
            DropIndex("dbo.Shipping_Control", new[] { "Order_Detail_Number" });
            DropIndex("dbo.Inventory", new[] { "Vendor_ID" });
            DropIndex("dbo.Inventory", new[] { "Item_Control" });
            DropIndex("dbo.Item_Control", new[] { "Contents_ID" });
            DropIndex("dbo.Org_Order_Details", new[] { "Item_Control_ID" });
            DropIndex("dbo.Org_Order_Details", new[] { "OrderId" });
            DropIndex("dbo.Org_Orders", new[] { "Shopper_ID" });
            DropIndex("dbo.Org_Orders", new[] { "Member_ID" });
            DropIndex("dbo.Org_Orders", new[] { "Profile_ID" });
            DropIndex("dbo.Org_Orders", new[] { "Campaign_ID" });
            DropIndex("dbo.Org_Control", new[] { "Distributor_ID" });
            DropIndex("dbo.Invoice", new[] { "Invoice_Contact_ID" });
            DropIndex("dbo.Org_Contact", new[] { "Org_Or_Work_Address_ID" });
            DropIndex("dbo.Org_Contact", new[] { "Shipping_Address_ID" });
            DropIndex("dbo.Org_Contact", new[] { "Billing_Address_ID" });
            DropIndex("dbo.Org_Contact", new[] { "Contact_Address_ID" });
            DropIndex("dbo.Org_Contact", new[] { "Profile_ID" });
            DropIndex("dbo.Org_Campaign_Details", new[] { "Campaign_ID" });
            DropIndex("dbo.Org_Campaign", new[] { "ProfileId" });
            AlterColumn("dbo.Logs", "Record_Created", c => c.DateTime());
            AlterColumn("dbo.Users", "Record_Created", c => c.DateTime());
            DropColumn("dbo.Logs", "Last_Modified");
            DropColumn("dbo.Users", "Last_Modified");
            DropTable("dbo.Vendor");
            DropTable("dbo.Shoppers");
            DropTable("dbo.Org_Profile");
            DropTable("dbo.Org_Members");
            DropTable("dbo.Payments");
            DropTable("dbo.Shipping_Control");
            DropTable("dbo.Item_Contents");
            DropTable("dbo.Inventory");
            DropTable("dbo.Item_Control");
            DropTable("dbo.Org_Order_Details");
            DropTable("dbo.Org_Orders");
            DropTable("dbo.Distributors");
            DropTable("dbo.Org_Control");
            DropTable("dbo.Invoice");
            DropTable("dbo.Addresses");
            DropTable("dbo.Org_Contact");
            DropTable("dbo.Org_Campaign_Details");
            DropTable("dbo.Org_Campaign");
            RenameColumn(table: "dbo.Logs", name: "Record_Created", newName: "Created");
            RenameColumn(table: "dbo.Users", name: "Record_Created", newName: "Created");
            AddForeignKey("dbo.UserClaims", "UserId", "dbo.Users", "Id");
        }
    }
}
