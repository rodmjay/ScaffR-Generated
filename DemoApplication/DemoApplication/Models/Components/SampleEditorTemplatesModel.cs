﻿#region credits

// ***********************************************************************
// Assembly	: DemoApplication
// Author	: Rod Johnson
// Created	: 03-16-2013
// 
// Last Modified By : Rod Johnson
// Last Modified On : 03-28-2013
// ***********************************************************************

#endregion

namespace DemoApplication.Models.Components
{
    #region

    using System;
    using System.ComponentModel.DataAnnotations;
    using Metadata.Attributes;

    #endregion

    public class SampleEditorTemplatesModel
    {
        [CreditCardTextbox]
        [Display(Name = "Credit Card Number")]
        [Required]
        public string CreditCardNumber { get; set; }

        [PhoneNumberTextbox]
        [Display(Name = "Phone Number")]
        [Required]
        public string PhoneNumber { get; set; }

        [UrlTextbox(UrlOptions.OptionalProtocol)]
        [Required]
        [Display(Name = "Url (optional protocol)")]
        public string SampleUrl { get; set; }

        [NumericTextbox]
        [Required]
        [Display(Name = "Numeric")]
        public string NumericData { get; set; }

        [Display(Name = "DateTime")]
        [Required]
        [Textbox(TextboxSize = TextboxSize.Large)]
        public DateTime? DateTime { get; set; }

        [EmailTextbox]
        [Required]
        public string Email { get; set; }

        [YearTextbox]
        [Required]
        public int? Year { get; set; }

        [DigitsTextbox]
        [Required]
        public string Digits { get; set; }

        [EqualTo("EqualToB")]
        [Textbox(TextboxSize = TextboxSize.Large)]
        public string EqualToA { get; set; }

        [EqualTo("EqualToA")]
        [Textbox(TextboxSize = TextboxSize.Large)]
        public string EqualToB { get; set; }
    }
}