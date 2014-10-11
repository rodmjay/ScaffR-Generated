using DemoApplication.Core.Interfaces.Validation;
using DemoApplication.Core.Model;

namespace DemoApplication.Core.Interfaces.Service
{
    public interface IContactService
    {
        IValidationContainer<Contact> CreateContact(string firstName, string lastName);
        IValidationContainer<Contact> UpdateContact(int id, string firstName, string lastName);
    }
}