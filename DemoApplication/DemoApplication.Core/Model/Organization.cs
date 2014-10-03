#region

using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

#endregion

namespace DemoApplication.Core.Model
{
    [Table("Org_Control")]
    public class Organization : DomainObject
    {
        public int Id { get; set; }

        public string Name { get; set; }

        [Column("Org_Type")]
        public OrganizationType OrganizationType { get; set; }

        [Column("Org_Status")]
        public OrganizationStatus Status { get; set; }

        [Column("Campaign_ID")]
        public int CampaignId { get; set; }

        [Column("Distributor_ID")]
        public int DistributorId { get; set; }

        [Column("Email_Validated")]
        public bool EmailValidated { get; set; }

    }
}