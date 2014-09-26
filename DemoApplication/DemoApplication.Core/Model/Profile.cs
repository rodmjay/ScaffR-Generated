#region

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#endregion

namespace DemoApplication.Core.Model
{
    [Table("Org_Profile")]
    public class Profile : Organization
    {
        [Column("Join_Date")]
        public DateTime JoinDate { get; set; }

        public int AdminId { get; set; }

        #region Navigation Properties



        #region Campaigns

        public virtual ICollection<Campaign> Campaigns { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<Shopper> Shoppers { get; set; }
        public virtual ICollection<Membership> Members { get; set; }
        public virtual ICollection<Contact> Contacts { get; set; }

        #endregion    

        //public virtual ICollection<Contact> Contacts { get; set; }

        #endregion
    }
}