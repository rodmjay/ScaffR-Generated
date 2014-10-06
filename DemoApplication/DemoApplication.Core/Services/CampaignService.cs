namespace DemoApplication.Core.Services
{
    using System;
    using Extensions;
    using Interfaces.Data;
    using Interfaces.Service;
    using Interfaces.Validation;
    using Model;

    public class CampaignService : BaseService<Campaign>, ICampaignService
    {
        private readonly IRepository<ProductList> _productListRepository;

        public CampaignService(IUnitOfWork unitOfWork, IRepository<ProductList> productListRepository ) : base(unitOfWork)
        {
            _productListRepository = productListRepository;
        }

        public IValidationContainer<Campaign> CreateCampaign(string name)
        {
            var campaign = new Campaign();

            var container = campaign.GetValidationContainer();

            return container;
        }

        public IValidationContainer<Campaign> CreateCampaignFromList(int productListId, string name)
        {
            var campaign = CreateCampaign(name);

            var list = _productListRepository.GetById(productListId);

            foreach (var product in list.Products)
            {
                campaign.Entity.CampaignItems.Add(new CampaignItem
                {
                    CampaignId = campaign.Entity.Id,
                    ProductId = product.Id
                });
            }

            SaveOrUpdate(campaign.Entity);

            return campaign;
        }

        public IValidationContainer<Campaign> UpdateCampaign(int campaignId, string name, string description)
        {
            var campaign = GetById(campaignId);
            campaign.Name = name;

            var container = campaign.GetValidationContainer();
            if (!container.IsValid)
                return container;

            return campaign.GetValidationContainer();
        }


        public IValidationContainer<Campaign> ApproveCampaign(int campaignId)
        {
            var campaign = GetById(campaignId);
            campaign.AdminApprovalDate = DateTime.UtcNow;

            SaveOrUpdate(campaign);

            return campaign.GetValidationContainer();
        }
    }
}
