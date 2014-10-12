#region

using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using DemoApplication.Core.Model;
using DemoApplication.Metadata.Attributes;
using DemoApplication.Models.Campaigns;
using DemoApplication.Models.Common;
using DemoApplication.Models.Shoppers;

#endregion

namespace DemoApplication.Models.Orders
{
    [Wizard]
    public class CreateOrderModel
    {
        [UIHint("Packages"), WizardStep("Choose products")]
        public ICollection<ChooseProductViewModel> Products { get; set; } 

        [WizardStep("Order Details")]
        public OrderModel Order { get; set; }

        [WizardStep("Personal Information")]
        public ShopperModel Shopper { get; set; }

        [WizardStep("Billing Information")]
        public CreditCardInfo CreditCard { get; set; }
    }
}