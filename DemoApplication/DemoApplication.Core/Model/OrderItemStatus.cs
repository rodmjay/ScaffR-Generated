using System;
using System.Runtime.Serialization;

namespace DemoApplication.Core.Model
{
    [Flags, DataContract]
    public enum OrderItemStatus
    {
        [EnumMember]
        None = 0
    }
}