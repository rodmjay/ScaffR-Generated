using System;
using DemoApplication.Core.Interfaces.Service;

namespace DemoApplication.Core.Services
{
    using Extensions;
    using Interfaces.Data;
    using Interfaces.Validation;
    using Model;

    public class ProductService : BaseService<Product>, IProductService
    {
        private readonly IRepository<ProductList> _productListRepository;

        public ProductService(IUnitOfWork unitOfWork, IRepository<Product> productRepository, IRepository<ProductList> productListRepository  ) : base(unitOfWork)
        {
            Repository = productRepository;
            _productListRepository = productListRepository;
        }

        public IValidationContainer<Product> CreateProduct(string name, string description, decimal price)
        {
            var product = new Product();

            SaveOrUpdate(product);

            return product.GetValidationContainer();
        }

        public IValidationContainer<ProductList> CreateProductList(string name)
        {
            var list = new ProductList
            {
                Name = name
            };

            _productListRepository.SaveOrUpdate(list);

            return list.GetValidationContainer();
        }
    }
}
