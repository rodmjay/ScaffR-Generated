using System;

namespace DemoApplication.Models.Organization
{
    public class OrganizationViewModel : OrganizationModel
    {
        public DateTime Created { get; set; }
    }

    public class OrganizationModel
    {
        public string Name { get; set; }
    }
}