#region

using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

#endregion

namespace DemoApplication.Core.Model
{
    [DataContract, Table("Org_Control")]
    public class Organization : DomainObject
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string Name { get; set; }

        [DataMember, Column("Org_Type")]
        public OrganizationType OrganizationType { get; set; }

        [DataMember, Column("Org_Status")]
        public OrganizationStatus Status { get; set; }

        [DataMember, Column("Campaign_ID")]
        public int CampaignId { get; set; }

        [DataMember, Column("Distributor_ID")]
        public int DistributorId { get; set; }

        [DataMember, Column("Email_Validated")]
        public bool EmailValidated { get; set; }
    }
}