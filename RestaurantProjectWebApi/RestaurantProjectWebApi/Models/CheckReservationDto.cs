using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RestaurantDataAccess.Models
{
   public class CheckReservationDto
    {
        [Required]
        public string Date { get; set; }
        [Required]
        [Range(1,10)]
        public int GuestsNr { get; set; }
        [Required]
        [Range(1,24)]
        public string Time { get; set; }
    }
}
