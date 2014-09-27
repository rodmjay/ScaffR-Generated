#region

using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

#endregion

namespace DemoApplication.Core.Model
{
    [DataContract]
    public class CampaignInfo
    {
        [DataMember, Display(Name = "Name")]
        public string Name { get; set; }

        [DataMember, Display(Name = "Description")]
        public string Description { get; set; }

        [DataMember, Display(Name = "Web Only")]
        public bool WebOnly { get; set; }

        [DataMember, Display(Name = "Start Date")]
        public DateTime SaleStart { get; set; }

        [DataMember, Display(Name="End Date")]
        public DateTime SaleEnd { get; set; }

        [DataMember, Display(Name = "Pre Order Deadline")]
        public DateTime PreOrderDeadline { get; set; }

        [DataMember, Display(Name = "Delivery Date")]
        public DateTime DeliveryDate { get; set; }

        [DataMember, Display(Name = "Alt. Delivery Date")]
        public DateTime AlternateDeliveryDate { get; set; }
    }
}