using DemoApplication.Core.Interfaces.Data;
using DemoApplication.Core.Model;
using DemoApplication.Infrastructure.Data;

namespace DemoApplication.Infrastructure.Contacts
{
    public class ContactsRepository : BaseRepository<Contact>
    {
        public ContactsRepository(IDatabaseFactory databaseFactory) : base(databaseFactory)
        {
        }
    }
}
