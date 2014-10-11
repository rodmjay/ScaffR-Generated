using System;
using System.Runtime.Serialization;

namespace DemoApplication.Core.Model
{
    [DataContract]
    [Flags]
    public enum OrderStatus
    {
        [EnumMember] None = 0,

        [EnumMember] Received = 1,

        [EnumMember] InProgress = 2
    }
}