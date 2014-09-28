using System.ComponentModel.DataAnnotations;

namespace DemoApplication.Models.Contacts
{
    public class ContactModel
    {
        [Required, MaxLength(15), Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Required, MaxLength(25), Display(Name = "Last Name")]
        public string LastName { get; set; }
    }
}