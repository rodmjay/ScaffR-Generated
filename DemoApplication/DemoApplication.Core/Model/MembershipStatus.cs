using System;
using System.Runtime.Serialization;

namespace DemoApplication.Core.Model
{
    [DataContract]
    [Flags]
    public enum MembershipStatus
    {
        [EnumMember] None = 0,

        [EnumMember] Created = 1
    }
}