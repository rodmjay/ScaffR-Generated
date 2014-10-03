using System.ComponentModel.DataAnnotations;
using DemoApplication.Metadata.Attributes;

namespace DemoApplication.Models.Invitations
{
    public class InvitationModel
    {
        [Required,Display(Name = "Full Name")]
        public string FullName { get; set; }

        [Required,Display(Name = "Email Address")]
        [EmailTextbox(TextboxSize = TextboxSize.Large)]
        public string EmailAddress { get; set; }

        [Display(Name = "Phone Number"), DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }
    }
}
