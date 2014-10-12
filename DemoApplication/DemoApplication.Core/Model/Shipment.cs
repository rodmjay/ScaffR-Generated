using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace DemoApplication.Core.Model
{
    [DataContract, Table("Shipping_Control")]
    public class Shipment : DomainObject
    {
        [DataMember, Key, Column("Shipment_Number")]
        public int Id { get; set; }

        [DataMember, Column("Order_Detail_Number")]
        public int OrderItemId { get; set; }

        [DataMember, Column("Shopper_ID")]
        public int ShopperId { get; set; }

        [DataMember, ForeignKey("OrderItemId")]
        public virtual OrderItem OrderItem { get; set; }

        [DataMember, ForeignKey("ShopperId")]
        public virtual Shopper Shopper { get; set; }
    }
}