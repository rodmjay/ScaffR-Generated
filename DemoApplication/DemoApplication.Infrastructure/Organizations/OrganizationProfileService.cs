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

        public OrganizationProfileService(IUnitOfWork unitOfWork, IRepository<Profile> repository, IUserAccountService accountService)
            : base(unitOfWork)
        {
            _accountService = accountService;
            Repository = _repository = repository;
        }

        public IValidationContainer<Profile> CreateOrganization(string name, string email, OrganizationType type)
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
    }
}
