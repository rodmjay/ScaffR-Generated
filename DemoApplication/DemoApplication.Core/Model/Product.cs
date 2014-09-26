using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace DemoApplication.Core.Model
{
    [DataContract, Table("Item_Prize")]
    public class Prize : DomainObject
    {
        public int Id { get; set; }

        public string Name { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Description { get; set; }

        public string Thumbnail { get; set; }

        /// <summary>
        /// Like frequent flyer points... how much would it be to redeem it?
        /// </summary>
        public int PrizePointsValue { get; set; }
    }

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