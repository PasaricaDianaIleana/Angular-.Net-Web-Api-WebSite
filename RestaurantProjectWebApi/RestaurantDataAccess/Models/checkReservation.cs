using System;
using System.Collections.Generic;
using System.Text;

namespace RestaurantDataAccess.Models
{
   public class CheckReservation
    {
        public int Id { get; set; }
        public string Date { get; set; }
        public int GuestsNr { get; set; }
        public string Time { get; set; }
    }
}
