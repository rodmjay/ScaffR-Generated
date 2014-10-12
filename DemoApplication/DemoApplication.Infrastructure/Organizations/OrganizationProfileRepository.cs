using DemoApplication.Core.Interfaces.Data;
using DemoApplication.Core.Model;
using DemoApplication.Infrastructure.Data;

namespace DemoApplication.Infrastructure.Organizations
{
    public class OrganizationProfileRepository : BaseRepository<Profile>
    {
        public OrganizationProfileRepository(IDatabaseFactory databaseFactory) : base(databaseFactory)
        {
        }
    }
}