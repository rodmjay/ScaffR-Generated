using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace DemoApplication.Core.Model
{
    [DataContract, Table("Shoppers")]
    public class Shopper : Contact
    {
        public Shopper()
        {
            this.Orders = new Collection<Order>();
        }

        [DataMember]
        public int PaymentId { get; set; }

        [ForeignKey("PaymentId")]
        public Payment Payment { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}