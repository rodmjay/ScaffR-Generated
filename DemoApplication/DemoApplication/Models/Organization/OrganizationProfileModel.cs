#region

using System.ComponentModel.DataAnnotations;
using DemoApplication.Core.Model;
using DemoApplication.Metadata.Attributes;

#endregion

namespace DemoApplication.Models.Organization
{
    public class OrganizationProfileModel
    {
        [Display(Name="Organization Name")]
        [Textbox(TextboxSize = TextboxSize.Large)]
        public string Name { get; set; }

        [Display(Name = "Organization Type")]
        public OrganizationType OrganizationType { get; set; }

        [Display(Name = "Email")]
        [EmailTextbox]
        public string Email { get; set; }
    }
}