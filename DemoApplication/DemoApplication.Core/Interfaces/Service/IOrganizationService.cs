using DemoApplication.Core.Interfaces.Validation;
using DemoApplication.Core.Model;

namespace DemoApplication.Core.Interfaces.Service
{
    public interface IOrganizationService : IService<Profile>
    {
        IValidationContainer<Profile> CreateOrganization(string name, string email, OrganizationType type);
    }
}
