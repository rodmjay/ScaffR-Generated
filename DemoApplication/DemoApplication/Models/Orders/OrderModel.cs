namespace DemoApplication.Models.Orders
{
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;

    public class OrderModel
    {
        [DataMember, Display(Name = "Details")]
        public string Details { get; set; }

        [DataMember, Display(Name = "PO Number")]
        public string PoNumber { get; set; }

        [DataMember, Display(Name = "Invoice Number")]
        public string InvoiceNumber { get; set; }

        [DataMember, Display(Name = "Special Instructions")]
        public string OrderInstructions { get; set; }
    }
}