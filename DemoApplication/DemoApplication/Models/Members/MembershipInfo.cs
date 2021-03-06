﻿#region

using System.Runtime.Serialization;

#endregion

namespace DemoApplication.Models.Members
{
    [DataContract]
    public class MembershipInfo
    {
        [DataMember]
        public int OrganizationId { get; set; }

        [DataMember]
        public string Email { get; set; }

        [DataMember]
        public string FirstName { get; set; }

        [DataMember]
        public string LastName { get; set; }
    }
}