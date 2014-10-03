using DemoApplication.Core.Interfaces.Data;
using DemoApplication.Core.Model;
using DemoApplication.Infrastructure.Data;

namespace DemoApplication.Infrastructure.Products
{
    public class ProductRepository : BaseRepository<Product>
    {
        public ProductRepository(IDatabaseFactory databaseFactory) : base(databaseFactory)
        {
        }
    }
}
