using DemoApplication.Core.Interfaces.Data;
using DemoApplication.Core.Interfaces.Service;
using DemoApplication.Core.Model;
using DemoApplication.Core.Services;

namespace DemoApplication.Infrastructure.Campaigns
{
    public class CampaignService : BaseService<Campaign>, ICampaignService
    {
        private readonly IRepository<Campaign> _campaignRepository;

        public CampaignService(IUnitOfWork unitOfWork, IRepository<Campaign> campaignRepository) : base(unitOfWork)
        {
            this.Repository = _campaignRepository = campaignRepository;
        }
    }
}
