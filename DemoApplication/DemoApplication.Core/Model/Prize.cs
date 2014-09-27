using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace DemoApplication.Core.Model
{
    [DataContract, Table("Item_Prize")]
    public class Prize : DomainObject
    {
        public int Id { get; set; }

        public string Name { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Description { get; set; }

        public string Thumbnail { get; set; }

        /// <summary>
        /// Like frequent flyer points... how much would it be to redeem it?
        /// </summary>
        public int PrizePointsValue { get; set; }
    }
}