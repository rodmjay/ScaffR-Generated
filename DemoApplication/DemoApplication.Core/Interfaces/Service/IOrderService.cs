using DemoApplication.Core.Interfaces.Validation;
using DemoApplication.Core.Model;

namespace DemoApplication.Core.Interfaces.Service
{
    public interface IOrderService
    {
        IValidationContainer<Order> CreateOrder();

        IValidationContainer<Order> UpdateOrderStatus(int orderId, OrderStatus status);
    }
}