#region

using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

#endregion

namespace DemoApplication.Core.Model
{
    [DataContract, Table("Org_Members")]
    public class Membership : Contact
    {
        [DataMember, Column("Member_Status")]
        public MembershipStatus Status { get; set; }

        [DataMember, Column("Org_ID")]
        public int OrganizationId { get; set; }

        [DataMember, Column("Email_Validated")]
        public bool EmailValidated { get; set; }

        [DataMember, Column("Contact_ID")]
        public int? ContactId { get; set; }

        [DataMember, Column("Member_Type")]
        public MembershipType MembershipType { get; set; }

        [DataMember, Column("Member_Record_No")]
        public string RecordNumber { get; set; }
    }
}