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
    }
}
