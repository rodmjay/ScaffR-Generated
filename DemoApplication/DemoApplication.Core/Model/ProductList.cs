using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DemoApplication.Core.Model
{
    public class ProductList : DomainObject
    {
        public string Name { get; set; }

        public virtual ICollection<Product> Products { get; set;  }

        public override IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if(Products.Count == 0)
                yield return new ValidationResult("Product List must contain at least one product");
        }
    }
}
