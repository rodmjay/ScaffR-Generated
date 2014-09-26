#region

using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

#endregion

namespace DemoApplication.Core.Model
{
    [DataContract]
    public class OrderInfo
    {
        [DataMember]
        public string OrderType { get; set; }

        [DataMember]
        public string InvoiceNumber { get; set; }

        [DataMember]
        public DateTime OrderDate { get; set; }

        [DataMember]
        public string Details { get; set; }

        [DataMember]
        public string OrganizationId { get; set; }

        [DataMember]
        public string CampaignId { get; set; }

        [DataMember]
        public string MemberId { get; set; }

        [DataMember]
        public string ShopperId { get; set; }

        [DataMember]
        public string PoNumber { get; set; }

        [DataMember]
        public OrderStatus Status { get; set; }

        [DataMember]
        public string OrderInstructions { get; set; }

        [DataMember]
        public string OrderLog { get; set; }

        public ICollection<OrderItemInfo> OrderItems { get; set; } 
    }
}