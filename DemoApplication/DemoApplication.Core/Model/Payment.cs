using System.Runtime.Serialization;

namespace DemoApplication.Core.Model
{
    [DataContract]
    public class Payment : DomainObject
    {
        [DataMember]
        public int Id { get; set; }
    }
}