﻿using System;

namespace DemoApplication.Areas.Api.Models
{
    public class Assignment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime? CompletedDate { get; set; }
        public bool IsDone { get; set; }

        public string EmployeeId { get; set; }
        public string PrincipalType { get; set; }
        public string PrincipalId { get; set; }
        public int CategoryId { get; set; }
    }
}