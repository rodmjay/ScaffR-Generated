using System;
using System.Collections;
using DemoApplication.Core.Extensions;
using DemoApplication.Core.Interfaces.Validation;

namespace DemoApplication.Core.Services
{
    using Interfaces.Data;
    using Interfaces.Service;
    using Model;

    public class ContactService : BaseService<Contact>, IContactService
    {
        public ContactService(IUnitOfWork unitOfWork, IRepository<Contact> repository) : base(unitOfWork)
        {
            Repository = repository;
        }

        public IValidationContainer<Contact> CreateContact(string firstName, string lastName)
        {
            Contact contact = new Contact();
            contact.FirstName = firstName;
            contact.LastName = lastName;

            contact.Created = DateTime.UtcNow;

            return contact.GetValidationContainer();
        }

        public IValidationContainer<Contact> UpdateContact(int id, string firstName, string lastName)
        {
            throw new System.NotImplementedException();
        }
    }
}