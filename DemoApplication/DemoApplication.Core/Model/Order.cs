#region

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

#endregion

namespace DemoApplication.Core.Model
{
    [DataContract, Table("Distributors")]
    public class Distributor : DomainObject
    {
        public int Id { get; set; }
    }

    [DataContract,Table("Org_Orders")]
    public class Order : DomainObject
    {
        public Order()
        {
            this.OrderItems = new Collection<OrderItem>();
        }

        [DataMember,Key]
        public int Id { get; set; }

        [DataMember, Column("Order_Type")]
        public string OrderType { get; set; }

        [DataMember, Column("Invoice_Number")]
        public string InvoiceNumber { get; set; }

        [DataMember, Column("Order_Date")]
        public DateTime OrderDate { get; set; }

        [DataMember, Column("Order_Details")]
        public string OrderDetails { get; set; }

        [DataMember, Column("Campaign_ID")]
        public int CampaignId { get; set; }

        [Column("Profile_ID")]
        public int ProfileId { get; set; }

        [DataMember, Column("Member_ID")]
        public int MemberId { get; set; }

        [DataMember, Column("Shopper_ID")]
        public int ShopperId { get; set; }

        [DataMember, Column("Customer_Ourchase_Order_No")]
        public string PoNumber { get; set; }

        [DataMember, Column("Order_Status")]
        public OrderStatus Status { get; set; }

        [DataMember, Column("Order_Instructions")]
        public string OrderInstructions { get; set; }

        [DataMember, Column("Order_Log")]
        public string OrderLog { get; set; }

        public virtual ICollection<OrderItem> OrderItems { get; set; }

        [ForeignKey("ShopperId")]
        public virtual Shopper Shopper { get; set; }

        [ForeignKey("CampaignId")]
        public virtual Campaign Campaign { get; set; }

        [ForeignKey("MemberId")]
        public virtual Membership Member { get; set; }
    }
}