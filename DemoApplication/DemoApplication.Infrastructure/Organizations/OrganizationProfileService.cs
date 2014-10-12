using System;

namespace DemoApplication.Infrastructure.Organizations
{
    using Core.Extensions;
    using Core.Interfaces.Data;
    using Core.Interfaces.Service;
    using Core.Interfaces.Validation;
    using Core.Model;
    using Core.Services;

    public class OrganizationProfileService : BaseService<Profile>, IOrganizationService
    {
        private readonly IUserAccountService _accountService;
        private IRepository<Profile> _repository;

        public OrganizationProfileService(IUnitOfWork unitOfWork, IRepository<Profile> repository,
            IUserAccountService accountService)
            : base(unitOfWork)
        {
            _accountService = accountService;
            Repository = _repository = repository;
        }

        public IValidationContainer<Profile> CreateOrganization(string name, OrganizationType type)
        {
            var profile = new Profile()
            {
                Name = name,
                OrganizationType = type,
                JoinDate = DateTime.UtcNow
            };

            var validation = profile.GetValidationContainer();

            if (!validation.IsValid)
                return validation;

            _repository.SaveOrUpdate(profile);

            UnitOfWork.Commit();

            return validation;
        }

        public IValidationContainer<Profile> UpdateOrganization(string name)
        {
            // get the current user's organization id
            int id = 1089;

            var profile = _repository.GetById(id);

            profile.Name = name;
            profile.LastUpdated = DateTime.UtcNow;

            var container = profile.GetValidationContainer();
            if (!container.IsValid)
                return container;

            _repository.SaveOrUpdate(profile);

            return profile.GetValidationContainer();
        }

        public IValidationContainer<Profile> GetOrganization(int id)
        {
            return GetById(id).GetValidationContainer();
        }
    }
}
