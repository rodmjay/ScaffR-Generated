using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DemoApplication.Core.Interfaces.Data;
using DemoApplication.Core.Model;
using DemoApplication.Infrastructure.Data;

namespace DemoApplication.Infrastructure.Campaigns
{
    public class CampaignsRepository : BaseRepository<Campaign>
    {
        public CampaignsRepository(IDatabaseFactory databaseFactory) : base(databaseFactory)
        {
        }
    }
}