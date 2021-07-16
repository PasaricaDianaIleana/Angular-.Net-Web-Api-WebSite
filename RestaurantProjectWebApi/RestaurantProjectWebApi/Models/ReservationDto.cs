using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantProjectWebApi.Models
{
    public class ReservationDto
    {
        [Required]
        public int ReservationId { get; set; }
        [Required]
        public int GuestsNr { get; set; }
        [Required]
        public string Date { get; set; }
        [Required]
        public string Hour { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        public string UserId { get; set; }
    }
}
