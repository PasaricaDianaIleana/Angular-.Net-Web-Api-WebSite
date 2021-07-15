using RestaurantDataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace RestaurantDataAccess.Repository
{
    public interface IReservationRepository
    {
        Reservation AddReservation(Reservation reservation);
    void DeleteReservation(int id);
        Reservation EditReservation(Reservation reservation);
        List<Reservation> GetReservationsByUserId(int id);
        List<Reservation> GetAllReservations();
        Reservation GetReservationById(int id);
    }
}
