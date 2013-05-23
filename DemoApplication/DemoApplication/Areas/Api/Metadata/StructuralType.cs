﻿using System.Collections.Generic;

namespace DemoApplication.Areas.Api.Metadata
{
    public class StructuralType
    {
        public string ShortName { get; set; }
        public string Namespace { get; set; }
        public string AutoGeneratedKeyType { get; set; }

        public List<DataProperty> DataProperties { get; set; }
    }
}