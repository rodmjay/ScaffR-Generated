#region credits
// ***********************************************************************
// Assembly	: DemoApplication.Core
// Author	: Rod Johnson
// Created	: 02-24-2013
// 
// Last Modified By : Rod Johnson
// Last Modified On : 03-28-2013
// ***********************************************************************
#endregion

using System.Data.Entity.Core.Objects;

namespace DemoApplication.Core.Interfaces.Data
{
    #region

    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using Model;

    #endregion

    public interface IDataContext
    {
        ObjectContext ObjectContext();
        IDbSet<T> DbSet<T>() where T : DomainObject;
        DbEntityEntry Entry<T>(T entity) where T : DomainObject;
        void Dispose();
    }
}