using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace DemoApplication.Core.Model
{
    [DataContract, Table("Item_Control")]
    public class Product : DomainObject
    {
        [Key, DataMember, Column("Item_Control_ID")]
        public int Id { get; set; }

        [DataMember, Column("Contents_ID")]
        public int ItemContentsId { get; set; }

        [ForeignKey("ItemContentsId")]
        public virtual ItemContents ItemContents { get; set; }

        public virtual ICollection<Inventory> Inventories { get; set; }
    }
}