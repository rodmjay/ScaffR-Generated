﻿#region credits

// ***********************************************************************
// Assembly	: DemoApplication
// Author	: Rod Johnson
// Created	: 03-07-2013
// 
// Last Modified By : Rod Johnson
// Last Modified On : 03-28-2013
// ***********************************************************************

#endregion

using System.Data.Entity.Spatial;

namespace DemoApplication.Models.Common
{
    #region

    using Metadata.Attributes;

    #endregion

    public class AddressModel
    {
        [HideSurroundingChrome, Textbox(TextboxSize = TextboxSize.XLarge)]
        public string Address { get; set; }

        [HideSurroundingChrome]
        public DbGeography Location { get; set; }
    }
}