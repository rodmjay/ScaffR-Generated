using System;
using System.Runtime.Serialization;

namespace DemoApplication.Core.Model
{
    [DataContract]
    [Flags]
    public enum CampaignStatus
    {
        [EnumMember]
        None = 0,

        [EnumMember]
        Created = 1,

        [EnumMember]
        Active = 2,

        [EnumMember]
        Deactivated = 3,

        [EnumMember]
        Deleted = 4
    }
}