using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using DemoApplication.Metadata.Attributes;

namespace DemoApplication.Models.Campaigns
{
    public class CampaignInfoModel
    {
        public string Awesome { get; set; }
    }

    [Wizard]
    public class CreateCampaignModel
    {
        private ICollection<ChooseProductViewModel> _products;

        [UIHint("Packages"), WizardStep("Choose products")]
        public ICollection<ChooseProductViewModel> Products
        {
            get { return _products ?? (_products = new Collection<ChooseProductViewModel>()); }
            set { _products = value; }
        }

        [WizardStep("Campaign Details")]
        public CampaignInfoModel CampaignInfo { get; set; }
    }
}