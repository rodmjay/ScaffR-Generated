using DemoApplication.Core.Model;
using DemoApplication.Models.Common;

namespace DemoApplication.Models.Shoppers
{
    public class ShopperInfo : ContactInfo
    {
        public ShopperInfo()
        {
            this.CreditCard = new CreditCardInfo();
        }

        public CreditCardInfo CreditCard { get; set; }
    }
}