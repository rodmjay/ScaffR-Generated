using System.Runtime.Serialization;

namespace DemoApplication.Core.Model
{
    [DataContract]
    public class OrderItemInfo
    {
        [DataMember]
        public string ProductId { get; set; }

        [DataMember]
        public int Quantity { get; set; }
    }
}
