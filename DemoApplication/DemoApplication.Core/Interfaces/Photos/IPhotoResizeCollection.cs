#region credits

// ***********************************************************************
// Assembly	: DemoApplication.Core
// Author	: Rod Johnson
// Created	: 03-16-2013
// 
// Last Modified By : Rod Johnson
// Last Modified On : 03-28-2013
// ***********************************************************************

#endregion

namespace DemoApplication.Core.Interfaces.Photos
{
    #region

    using System.Collections.Generic;

    #endregion

    public interface IPhotoResizeCollection : IEnumerable<IPhotoResize>
    {
    }
}