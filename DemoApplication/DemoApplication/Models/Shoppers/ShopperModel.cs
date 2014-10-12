using System.ComponentModel.DataAnnotations;
using DemoApplication.Dropdowns.Attributes;
using DemoApplication.Models.Common;
using DemoApplication.Models.Contacts;

namespace DemoApplication.Models.Shoppers
{
    public class ShopperModel : ContactModel
    {
        [Display(Name="Address Line 1")]
        public string Address1 { get; set; }

        [Display(Name="Address Line 2")]
        public string Address2 { get; set; }

        [Display(Name="City")]
        public string City { get; set;  }

        [Display(Name="State"), DropDown("States", "US")]
        public string State { get; set; }

        [DataType(DataType.PostalCode), Display(Name="Zip Code")]
        public string ZipCode { get; set; }
    }
}