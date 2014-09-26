#region

using System;
using System.Runtime.Serialization;

#endregion

namespace DemoApplication.Core.Model
{
    [DataContract]
    [Flags]
    public enum OrganizationType
    {
        [EnumMember]
        None = 0
    }
}