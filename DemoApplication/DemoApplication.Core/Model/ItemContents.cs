using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace DemoApplication.Core.Model
{
    [DataContract, Table("Item_Contents")]
    public class ItemContents : DomainObject
    {
        [DataMember, Column("Contents_ID")]
        public int Id { get; set; }

        [DataMember]
        public int Quantity { get; set; }

        [DataMember, Column("Pieces_Count")]
        public int PiecesCount { get; set; }

        [DataMember, Column("Pieces_Weight")]
        public decimal PiecesWeight { get; set; }

        [DataMember, Column("Item_Code")]
        public string ItemCode { get; set; }

        public virtual ICollection<Product> Products { get; set; } 
    }
}