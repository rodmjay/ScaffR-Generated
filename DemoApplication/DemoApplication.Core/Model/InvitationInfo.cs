using System.ComponentModel.DataAnnotations;

namespace DemoApplication.Core.Model
{
    public class InvitationInfo
    {
        [Display(Name = "Full Name")]
        public string FullName { get; set; }

        [Display(Name = "Email Address"), DataType(DataType.EmailAddress)]
        public string EmailAddress { get; set; }

        [Display(Name = "Phone Number"), DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }
    }
}
