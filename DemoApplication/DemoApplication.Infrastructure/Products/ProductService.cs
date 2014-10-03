using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DemoApplication.Core.Interfaces.Data;
using DemoApplication.Core.Interfaces.Service;
using DemoApplication.Core.Model;
using DemoApplication.Core.Services;

namespace DemoApplication.Infrastructure.Products
{
    public class ProductService : BaseService<Product>, IProductService
    {
        public ProductService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }
    }
}
