using System.Runtime.Serialization;

namespace DemoApplication.Core.Model
{
    [DataContract]
    public class CampaignTemplate
    {
        [DataMember]
        public int Id { get; set; }
    }
}
