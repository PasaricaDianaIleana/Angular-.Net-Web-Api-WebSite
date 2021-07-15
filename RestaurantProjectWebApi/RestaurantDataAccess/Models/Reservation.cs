using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RestaurantDataAccess.Models
{
  public  class Reservation
    {
        [Key]
        public int ReservationId { get; set; }
        public int GuestsNr { get; set; }
        public string Date { get; set; }
        public string Hour { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string  UserId { get; set; }
       
     

    }
}
