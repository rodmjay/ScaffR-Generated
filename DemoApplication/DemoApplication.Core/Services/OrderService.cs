using System;
using DemoApplication.Core.Interfaces.Data;
using DemoApplication.Core.Interfaces.Service;
using DemoApplication.Core.Interfaces.Validation;
using DemoApplication.Core.Model;

namespace DemoApplication.Core.Services
{
    public class OrderService : BaseService<Order>, IOrderService
    {
        private readonly IRepository<OrderItem> _itemRepository;

        public OrderService(IUnitOfWork unitOfWork, IRepository<OrderItem> itemRepository ) : base(unitOfWork)
        {
            _itemRepository = itemRepository;
        }

        public IValidationContainer<Order> CreateOrder()
        {
            throw new NotImplementedException();
        }

        public IValidationContainer<Order> UpdateOrderStatus(int orderId, OrderStatus status)
        {
            throw new NotImplementedException();
        }
    }
}
