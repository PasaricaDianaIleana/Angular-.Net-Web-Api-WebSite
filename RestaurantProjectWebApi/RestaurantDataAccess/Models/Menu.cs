using System;
using System.Collections.Generic;
using System.Text;

namespace RestaurantDataAccess.Models
{
   public class Menu
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
    }
}
