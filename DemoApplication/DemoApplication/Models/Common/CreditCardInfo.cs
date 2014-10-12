using System.ComponentModel.DataAnnotations;
using DemoApplication.Dropdowns.Attributes;
using DemoApplication.Metadata.Attributes;

namespace DemoApplication.Models.Common
{
    public class CreditCardInfo
    {
        [Display(Name = "Full Name"), Required]
        public string FullName { get; set; }

        [Display(Name = "Card Number"), Required]
        public string CardNumber { get; set; }

        [Display(Name = "CVV Code"), Textbox(DataType.Text)]
        public string CvvCode { get; set; }

        [DropDown("CreditCardTypes"), Display(Name = "Card Type"), DataType(DataType.CreditCard), Required]
        public string CardType { get; set; }

        [DropDown("Months"), Display(Name = "Exp. Month"), Required]
        public string ExpirationMonth { get; set; }

        [DropDown("CreditCardExpirationYears"), Display(Name = "Exp. Year"), Required]
        public string ExpirationYear { get; set; }
    }
}