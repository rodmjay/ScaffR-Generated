using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace DemoApplication.Core.Model
{
    [DataContract, Table("Vendor")]
    public class Vendor : Contact
    {
        [DataMember, Column("Vendor_Status")]
        public VendorStatus Status { get; set; }

        public virtual ICollection<Inventory> Inventories { get; set; }
    }
}