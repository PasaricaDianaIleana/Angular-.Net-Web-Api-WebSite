using System;
using System.Collections.Generic;
using System.Text;

namespace RestaurantDataAccess.Models
{
  public  class Reservation
    {
        public int Id { get; set; }
        public int GuestsNr { get; set; }
        public string Date { get; set; }
        public string Type { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Message { get; set; }
    }
}
