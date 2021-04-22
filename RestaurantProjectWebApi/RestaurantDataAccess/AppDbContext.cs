using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RestaurantDataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;


namespace RestaurantDataAccess
{
  public  class AppDbContext : IdentityDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Contact> Contact { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<CheckReservation> CheckReservations { get; set; }
        public DbSet<Menu> Menu { get; set; }
        public DbSet<User>AppUser { get; set; }


    }
}
