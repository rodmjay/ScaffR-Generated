using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace DemoApplication.Core.Model
{
    [DataContract,Table("Org_Campaign_Details")]
    public class CampaignItem : DomainObject
    {
        [DataMember,Key]
        public int Id { get; set; }

        [DataMember, Column("Campaign_ID")]
        public int CampaignId { get; set; }

        [DataMember,ForeignKey("CampaignId")]
        public Campaign Campaign { get; set; }
    }
}