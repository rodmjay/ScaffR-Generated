#region

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#endregion

namespace DemoApplication.Core.Model
{
    [Table("Addresses")]
    public class Address : DomainObject
    {
        [Key]
        public int Id { get; set; }

        [Column("Address_Type")]
        public AddressType AddressType { get; set; }

        [Column("Address_1")]
        public string Address1 { get; set; }

        [Column("Address_2")]
        public string Address2 { get; set; }

        [Column("City")]
        public string City { get; set; }

        [Column("State")]
        public string State { get; set; }

        [Column("Country")]
        public string Country { get; set; }

        [Column("Zip")]
        public string Zipcode { get; set; }

        [Column("Residential")]
        public bool Residential { get; set; }
    }
}