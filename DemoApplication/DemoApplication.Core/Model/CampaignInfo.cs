#region

using System;
using System.Runtime.Serialization;

#endregion

namespace DemoApplication.Core.Model
{
    [DataContract]
    public class CampaignInfo
    {
        [DataMember]
        public int OrganizationId { get; set; }

        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public string Description { get; set; }

        [DataMember]
        public bool WebOnly { get; set; }

        [DataMember]
        public DateTime SaleStart { get; set; }

        [DataMember]
        public DateTime SaleEnd { get; set; }

        [DataMember]
        public DateTime PreOrderDeadline { get; set; }

        [DataMember]
        public DateTime DeliveryDate { get; set; }

        [DataMember]
        public DateTime AlternateDeliveryDate { get; set; }
    }
}