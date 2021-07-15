using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RestaurantDataAccess.Models
{
    public class User:IdentityUser
    {
        
        [Column(TypeName ="nvarchar(150)")]
        public string FullName { get; set; }
        
        public ICollection<Reservation> reservations { get; set; }
        
      
    }
}
