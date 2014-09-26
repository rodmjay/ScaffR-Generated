#region

using System.Runtime.Serialization;

#endregion

namespace DemoApplication.Core.Model
{
    [DataContract]
    public class ProfileInfo
    {
        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public OrganizationType OrganizationType { get; set; }

        [DataMember]
        public string Email { get; set; }
    }
}