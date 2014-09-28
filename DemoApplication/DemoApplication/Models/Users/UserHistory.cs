using System.Collections.Generic;
using DemoApplication.Core.Model;

namespace DemoApplication.Models.Users
{
    public class UserHistory : UserViewModel
    {
        public UserHistory()
        {
            Logs = new List<Log>();
        }

        public IList<Log> Logs { get; set; }
    }
}