using RestaurantDataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantDataAccess.Repository
{
    public interface IReservationRepository
    {
       Task<Reservation> AddReservation(Reservation reservation);
    Task DeleteReservation(int id);
        Task<Reservation> EditReservation(Reservation reservation);
       Task<IList<Reservation>> GetReservationsByUserId(string id);
        Task<IList<Reservation>> GetAllReservations();
        Task<Reservation> GetReservationById(int id);

        Task<bool> CheckResevation(string Date,string Hour, int guestNr);
        Task<IList<Reservation>> GetReservation(string Date);
    }
}
