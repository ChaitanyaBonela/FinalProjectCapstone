using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventManagementSystem.Models
{
    public class RSVP
    {
        [Key]
        public int RSVPId { get; set; }

        [Required]
        public int EventId { get; set; }  

        [Required]
        public int UserId { get; set; }

        [Required] 
        public string Status { get; set; }
    }
}
