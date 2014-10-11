using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace DemoApplication.Core.Model
{
    [DataContract, Table("Inventory")]
    public class Inventory : DomainObject
    {
        [DataMember, Key]
        public int Id { get; set; }

        [DataMember, Column("Item_Control")]
        public int ProductId { get; set; }

        [DataMember, Column("Vendor_ID")]
        public int VendorId { get; set; }

        [DataMember, Column("Purchase_Number")]
        public string PurchaseNumber { get; set; }

        [DataMember, Column("Purchase_Qty")]
        public int Quantity { get; set; }

        [DataMember, ForeignKey("ProductId")]
        public virtual Product Product { get; set; }

        [DataMember, ForeignKey("VendorId")]
        public virtual Vendor Vendor { get; set; }
    }
}