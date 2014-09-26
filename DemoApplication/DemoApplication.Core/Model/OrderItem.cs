using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace DemoApplication.Core.Model
{
    [DataContract, Table("Org_Order_Details")]
    public class OrderItem : DomainObject
    {
        public OrderItem()
        {
            this.Shipments = new Collection<Shipment>();
        }

        [Key, DataMember]
        public int Id { get; set; }

        [DataMember]
        public int OrderId { get; set; }

        [DataMember, Column("Item_Control_ID")]
        public int ProductId { get; set; }

        [DataMember,Column("Item_Price")]
        public decimal ItemPrice { get; set; }

        [DataMember, Column("Item_Quantity")]
        public int Quantity { get; set; }

        [DataMember, Column("Discount_Code")]
        public string DiscountCode { get; set; }

        [DataMember, Column("Item_Detail_Instructions")]
        public string Instructions { get; set; }

        [DataMember, Column("Item_Status")]
        public OrderItemStatus Status { get; set; }

        [DataMember, ForeignKey("ProductId")]
        public Product Product { get; set; }

        public virtual ICollection<Shipment> Shipments { get; set; } 
    }
}
