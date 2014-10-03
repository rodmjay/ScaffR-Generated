#region

using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using DemoApplication.Core.Model;
using DemoApplication.Models.Common;
using DemoApplication.Models.Shoppers;

#endregion

namespace DemoApplication.Models.Orders
{
    public class CreateOrderModel
    {
        public OrderModel Order { get; set; }

        public ShopperModel Shopper { get; set; }

        public CreditCardInfo CreditCard { get; set; }
    }
}