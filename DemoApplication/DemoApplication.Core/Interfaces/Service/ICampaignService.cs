using DemoApplication.Core.Common.Validation;
using DemoApplication.Core.Interfaces.Validation;
using DemoApplication.Core.Model;

namespace DemoApplication.Core.Interfaces.Service
{
    public interface ICampaignService : IService<Campaign>
    {
        IValidationContainer<Campaign> CreateCampaign(string name);

        IValidationContainer<Campaign> CreateCampaignFromList(int productListId, string name);

        IValidationContainer<Campaign> UpdateCampaign(int campaignId, string name, string description);

        IValidationContainer<Campaign> ApproveCampaign(int campaignId);
    }
}
