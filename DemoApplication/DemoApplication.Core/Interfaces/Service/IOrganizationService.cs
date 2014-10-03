using DemoApplication.Core.Interfaces.Validation;
using DemoApplication.Core.Model;

namespace DemoApplication.Core.Interfaces.Service
{
    public interface IOrganizationService : IService<Profile>
    {
        IValidationContainer<Profile> CreateOrganization(string name, OrganizationType type);

        IValidationContainer<Profile> UpdateOrganization(string name);

        IValidationContainer<Profile> GetOrganization(int id);
    }
}
