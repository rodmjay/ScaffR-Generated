#region

using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

#endregion

namespace DemoApplication.Core.Model
{
    [DataContract,Table("Org_Contact")]
    public class Contact : DomainObject
    {
        public Contact()
        {
            this.Invoices = new Collection<Invoice>();
        }

        [DataMember,Key]
        public int Id { get; set; }

        [DataMember, Column("Profile_ID")]
        public int ProfileId { get; set; }

        [DataMember, Column("Title")]
        public string Title { get; set; }

        [DataMember, Column("Gender")]
        public Gender Gender { get; set; }

        [DataMember, EmailAddress, Column("Member_Email")]
        public string Email { get; set; }

        [DataMember, Required, MaxLength(15), Column("FirstName")]
        public string FirstName { get; set; }

        [DataMember, Required, MaxLength(25), Column("LastName")]
        public string LastName { get; set; }

        [DataMember, Column("Contact_Address_ID")]
        public int AddressId { get; set; }

        [DataMember, Column("Billing_Address_ID")]
        public int BillingAddressId { get; set; }

        [DataMember, Column("Shipping_Address_ID")]
        public int ShippingAddressId { get; set; }

        [DataMember, Column("Org_Or_Work_Name")]
        public string OrgOrWorkName { get; set; }

        [DataMember, Column("Org_Or_Work_Address_ID")]
        public int OrgOrWorkAddressId { get; set; }

        [DataMember]
        public int StateId { get; set; }

        [DataMember]
        public string City { get; set; }

        [DataMember]
        public string Zipcode { get; set; }

        [DataMember]
        public string HomePhone { get; set; }

        [DataMember]
        public string CellPhone { get; set; }

        [DataMember]
        public string WorkPhone { get; set; }

        [DataMember]
        public string PhoneExt { get; set; }

        [DataMember]
        public string Fax { get; set; }

        [DataMember]
        public int BestTimeToCallId { get; set; }

        [DataMember]
        public string SocialMedia1 { get; set; }

        [DataMember]
        public string SocialMedia2 { get; set; }

        [DataMember]
        public string SocialMedia3 { get; set; }

        [DataMember]
        public string SocialMedia4 { get; set; }

        [DataMember]
        public string SocialMedia5 { get; set; }

        [DataMember]
        public string WebPage { get; set; }

        [DataMember]
        public string ReferredBy { get; set; }

        [ForeignKey("ProfileId")]
        public Profile Profile { get; set; }

        [DataMember, ForeignKey("AddressId")]
        public virtual Address Address { get; set; }

        [DataMember, ForeignKey("BillingAddressId")]
        public virtual Address BillingAddress { get; set; }

        [DataMember, ForeignKey("ShippingAddressId")]
        public virtual Address ShippingAddress { get; set; }

        [DataMember, ForeignKey("OrgOrWorkAddressId")]
        public virtual Address OrgOrWorkAddress { get; set; }

        public virtual ICollection<Invoice> Invoices { get; set; } 
    }
}