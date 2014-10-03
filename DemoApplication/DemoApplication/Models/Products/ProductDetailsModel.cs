using System.ComponentModel.DataAnnotations;

namespace DemoApplication.Models.Products
{
    public class ProductDetailsModel
    {
        public string Name { get; set; }

        public decimal Price { get; set; }

        public string ItemCode { get; set; }

        [ScaffoldColumn(false)]
        public int Id { get; set; }
    }
}