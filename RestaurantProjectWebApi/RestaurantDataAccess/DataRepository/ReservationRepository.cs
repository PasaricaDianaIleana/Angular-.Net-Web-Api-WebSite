using Microsoft.EntityFrameworkCore;
using RestaurantDataAccess.Models;
using RestaurantDataAccess.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantDataAccess.DataRepository
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly AppDbContext _context;
        public ReservationRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Reservation> AddReservation(Reservation reservation)
        {
            if (reservation != null)
            {
              await  _context.Reservations.AddAsync(reservation);
              await  _context.SaveChangesAsync();
                return reservation;
            }

            return null;
        }

        public async Task<bool> CheckResevation(string Date, string Hour, int guestNr)
        {
            var getReservation =await  _context.Reservations.Where(x => x.Date == Date && x.Hour == Hour && x.GuestsNr == guestNr).FirstOrDefaultAsync();
            { if(getReservation!=null)
                return true;
            }
            return false;
        }

    
        public async Task DeleteReservation(int id)
        {
            var data =await GetReservationById(id);
            _context.Reservations.Remove(data);
            await _context.SaveChangesAsync();

        }
        public async Task<Reservation> EditReservation(Reservation reservation)
        {
            var result = await _context.Reservations.FirstOrDefaultAsync(r => r.ReservationId == reservation.ReservationId);
            if (result != null)
            {
                result.Date = reservation.Date;
                result.Email = reservation.Email;
                result.FullName = reservation.FullName;
                result.GuestsNr = reservation.GuestsNr;
                result.Hour = reservation.Hour;
                result.PhoneNumber = reservation.PhoneNumber;

                await _context.SaveChangesAsync();
                return result;
            }
            return null;
        }

        public async Task<IList<Reservation>> GetAllReservations()
        {
            return await _context.Reservations.ToListAsync();
        }

        public async Task<IList<Reservation>> GetReservation(string Date)
        {
            return await _context.Reservations.Where(x => x.Date == Date).ToListAsync();
        }

        public async Task<Reservation> GetReservationById(int id)
        {
            return await _context.Reservations.FirstOrDefaultAsync(x => x.ReservationId == id);
        }

        public async Task<IList<Reservation>> GetReservationsByUserId(string id)
        {
            return await _context.Reservations.Where(x => x.UserId == id).ToListAsync();
        }

       
    }
}
