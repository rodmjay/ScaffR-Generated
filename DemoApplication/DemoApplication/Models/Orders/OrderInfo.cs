#region

using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using DemoApplication.Core.Model;
using DemoApplication.Models.Shoppers;

#endregion

namespace DemoApplication.Models.Orders
{
    [DataContract]
    public class OrderInfo
    {
        public OrderInfo()
        {
            this.OrderItems = new Collection<OrderItemInfo>();
            this.Shopper = new ShopperInfo();
        }

        [Display(Name = "Shopper Information")]
        public ShopperInfo Shopper { get; set; }

        [DataMember, Display(Name = "Details")]
        public string Details { get; set; }

        [DataMember, Display(Name = "PO Number")]
        public string PoNumber { get; set; }

        [DataMember, Display(Name = "Invoice Number")]
        public string InvoiceNumber { get; set; }

        [DataMember, Display(Name = "Special Instructions")]
        public string OrderInstructions { get; set; }

        public ICollection<OrderItemInfo> OrderItems { get; set; }
    }
}