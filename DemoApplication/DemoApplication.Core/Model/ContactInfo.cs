using System.ComponentModel.DataAnnotations;

namespace DemoApplication.Core.Model
{
    public class ContactInfo
    {
        [Required, MaxLength(15), Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Required, MaxLength(25), Display(Name = "Last Name")]
        public string LastName { get; set; }
    }
}