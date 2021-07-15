using RestaurantDataAccess.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantProjectWebApi.Models
{
    public class CategoryDto
    {
       [Required]
        public int CategoryId { get; set; }
        [Required]
        public string Name { get; set; }

    }
}
