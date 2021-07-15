using System;
using System.Collections.Generic;
using System.Text;

namespace RestaurantDataAccess.Models
{
   public class Review
    {
        public int ReviewId { get; set; }
        public DateTime ReviewDate { get; set; }
        public string Content { get; set; }
        public string Title { get; set; }
        public int Stars { get; set; }
   
        public Menu Menu { get; set; }
    }
}
