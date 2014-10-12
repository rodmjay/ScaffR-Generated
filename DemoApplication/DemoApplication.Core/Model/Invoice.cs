using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace DemoApplication.Core.Model
{
    [DataContract, Table("Invoice")]
    public class Invoice : DomainObject
    {
        [DataMember, Column("Invoice_Status")]
        public InvoiceStatus Status { get; set; }

        [DataMember, Column("Invoice_Date")]
        public DateTime InvoiceDate { get; set; }

        [DataMember, Column("Amount_Due")]
        public decimal AmountDue { get; set; }

        [DataMember, Column("Due_Date")]
        public DateTime DueDate { get; set; }

        [DataMember, Column("Paid_Amount")]
        public decimal PaidAmount { get; set; }

        [DataMember, Column("Invoice_Contact_ID")]
        public int ContactId { get; set; }

        [DataMember, ForeignKey("ContactId")]
        public virtual Contact Contact { get; set; }
    }
}