using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RestaurantDataAccess.Models
{
   public class Category
    {
        [Key]
        public int CategoryId { get; set; }
        public string Name { get; set; }
        [ForeignKey("CategoryId")]
        public ICollection<Menu> Items { get; set; }
    }
}
