namespace DemoApplication.Models.Orders
{
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;

    public class OrderModel
    {
        [DataMember, Display(Name = "Details")]
        public string Details { get; set; }

        [DataMember, Display(Name = "Reference Number")]
        public string PoNumber { get; set; }

        [DataMember, Display(Name = "Special Instructions"), DataType(DataType.MultilineText)]
        public string OrderInstructions { get; set; }
    }
}