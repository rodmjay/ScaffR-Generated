using System;
using System.Runtime.Serialization;

namespace DemoApplication.Core.Model
{
    [DataContract, Flags]
    public enum InvoiceStatus
    {
        [EnumMember]
        None  = 0
    }
}