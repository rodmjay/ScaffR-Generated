using System;
using System.Runtime.Serialization;

namespace DemoApplication.Core.Model
{
    [DataContract]
    [Flags]
    public enum OrganizationStatus
    {
        [EnumMember]
        None = 0,

        [EnumMember]
        Active = 1,

        [EnumMember]
        Inactive = 2
    }
}