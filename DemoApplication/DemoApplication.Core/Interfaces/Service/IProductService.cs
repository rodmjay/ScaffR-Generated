using DemoApplication.Core.Interfaces.Validation;
using DemoApplication.Core.Model;

namespace DemoApplication.Core.Interfaces.Service
{
    public interface IProductService
    {
        IValidationContainer<Product> CreateProduct(string name, string description, decimal price);
        IValidationContainer<ProductList> CreateProductList(string name);
    }
}