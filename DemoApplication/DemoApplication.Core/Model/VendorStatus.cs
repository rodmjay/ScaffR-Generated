using System;
using System.Runtime.Serialization;

namespace DemoApplication.Core.Model
{
    [Flags, DataContract]
    public enum VendorStatus
    {
        [EnumMember] None = 0
    }
}