﻿using System;
using System.Collections.Generic;
using System.Text;

namespace RestaurantDataAccess.Models
{
   public class Contact
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }
}
