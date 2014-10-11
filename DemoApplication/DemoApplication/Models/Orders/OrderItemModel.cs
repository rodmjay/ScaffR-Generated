using System.Runtime.Serialization;

namespace DemoApplication.Models.Orders
{
    [DataContract]
    public class OrderItemModel
    {
        [DataMember]
        public string ProductId { get; set; }

        [DataMember]
        public int Quantity { get; set; }
    }
}