namespace DemoApplication.Core.Model
{
    public class Link : DomainObject
    {
        public int CampaignId { get; set; }

        public int MembershipId { get; set; }

        public string Token { get; set; }
    }
}
