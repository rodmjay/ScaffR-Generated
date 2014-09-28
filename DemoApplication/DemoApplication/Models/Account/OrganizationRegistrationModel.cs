using DemoApplication.Models.Organization;

namespace DemoApplication.Models.Account
{
    public class OrganizationRegistrationModel
    {
        public CreateOrganizationProfileModel OrganizationProfileModel { get; set; }

        public RegisterModel UserRegistration { get; set; }
    }
}