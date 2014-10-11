using System.ComponentModel.DataAnnotations;
using DemoApplication.Dropdowns.Attributes;

namespace DemoApplication.Models.Common
{
    public class CreditCardInfo
    {
        [Display(Name = "Full Name")]
        public string FullName { get; set; }

        [Display(Name = "Card Number")]
        public string CardNumber { get; set; }

        [DropDown("CreditCardTypes")]
        public string CardType { get; set; }

        public string ExpirationMonth { get; set; }
        public string ExpirationYear { get; set; }
    }
}