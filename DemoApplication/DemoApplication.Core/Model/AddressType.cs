using System;
using System.Runtime.Serialization;

namespace DemoApplication.Core.Model
{
    [DataContract]
    [Flags]
    public enum AddressType
    {
        [EnumMember]
        None = 0
    }
}