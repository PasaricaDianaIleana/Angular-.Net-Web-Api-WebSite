using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RestaurantDataAccess.Models
{
   public class Menu
    {
        [Key]
        public int Id { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public int SoldNr { get; set; }
        public int CategoryId { get; set; }

        public virtual ICollection<Review> Reviews { get; set; }


    }
}
