using DemoApplication.Models.Common;
using DemoApplication.Models.Contacts;

namespace DemoApplication.Models.Shoppers
{
    public class ShopperModel : ContactModel
    {
        public ShopperModel()
        {
            this.CreditCard = new CreditCardInfo();
        }

        public CreditCardInfo CreditCard { get; set; }
    }
}