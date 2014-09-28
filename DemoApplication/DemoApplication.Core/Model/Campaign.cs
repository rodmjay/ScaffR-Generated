#region

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

#endregion

namespace DemoApplication.Core.Model
{
    [DataContract, Table("Org_Campaign")]
    public class Campaign : DomainObject
    {
        public Campaign()
        {
            this.CampaignItems = new Collection<CampaignItem>();
        }

        [DataMember, Key, Column("Campaign_ID")]
        public int Id { get; set; }

        [DataMember]
        public string Code { get; set; }

        [DataMember, Column("Campaign_Status")]
        public CampaignStatus Status { get; set; }

        [DataMember, Column("Campaign_Name")]
        public string Name { get; set; }

        [DataMember, Column("Description")]
        public string Description { get; set; }

        [DataMember, Column("Set_Profit_Flat")]
        public decimal ProfitFlat { get; set; }

        [DataMember, Column("Set_Profit_Margin")]
        public decimal ProfitMargin { get; set; }

        [DataMember, Column("Standard_Campaign")]
        public bool StandardCampaign { get; set; }
        
        public string StandardCampaignTemplate { get; set; }

        [DataMember, Column("Sales_Goal")]
        public decimal SalesGoal { get; set; }

        [DataMember, Column("Purpose_of_Funds")]
        public string PurposeOfFunds { get; set; }

        [DataMember, Column("Make_Checks_Payable_To")]
        public string MakeChecksPayableTo { get; set; }

        [DataMember, Column("Campaign_Chairperson")]
        public int ChairpersonId { get; set; }

        [DataMember, Column("Kick_Off_Meeting")]
        public DateTime? KickoffMeeting { get; set; }

        [DataMember, Column("Sale_Start")]
        public DateTime? SaleStart { get; set; }

        [DataMember, Column("Sale_End")]
        public DateTime? SaleEnd { get; set; }

        [DataMember, Column("Pre_Order_Deadline")]
        public DateTime? PreOrderDeadline { get; set; }

        [DataMember, Column("Delivery_Time")]
        public DateTime? DeliveryDate { get; set; }

        [DataMember, Column("Alternate_Delivery")]
        public DateTime? AlternateDeliveryDate { get; set; }

        [DataMember, Column("Pick_Up_Location")]
        public string PickupLocation { get; set; }

        [DataMember, Column("Brochure_Template")]
        public string BrochureTemplate { get; set; }

        [DataMember, Column("Published_Content_ID")]
        public string PublishedContentId { get; set; }

        [DataMember, Column("Media_Page_ID")]
        public string MediaPageId { get; set; }

        [DataMember, Column("Web_Only")]
        public bool WebOnly { get; set; }

        [DataMember, Column("Admin_Approval_Date")]
        public DateTime? AdminApprovalDate { get; set; }

        [DataMember]
        public int ProfileId { get; set; }

        public virtual ICollection<CampaignItem> CampaignItems { get; set; } 
    }
}