using System;
using System.Runtime.Serialization;

namespace DemoApplication.Core.Model
{
    [DataContract]
    [Flags]
    public enum OrderType
    {
        [EnumMember]
        None = 0
    }
}