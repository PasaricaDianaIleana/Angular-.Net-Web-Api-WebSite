using Microsoft.AspNetCore.Mvc;
using RestaurantDataAccess.Models;
using RestaurantDataAccess.Repository;
using RestaurantProjectWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantProjectWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationRepository _repo;

        public ReservationController(IReservationRepository repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public List<ReservationDto> GetAll()
        {
            var reservation = _repo.GetAllReservations()
                 .Select(r => new ReservationDto
                 {
                     ReservationId = r.ReservationId,
                     GuestsNr = r.GuestsNr,
                     Date = r.Date,
                     Hour = r.Hour,
                     PhoneNumber = r.PhoneNumber,
                     Email = r.Email,
                     FullName = r.FullName,
                     UserId = r.UserId
                 }) ;
            return reservation.ToList();
        }
        [HttpPost]
        public IActionResult AddReservation([FromBody] Reservation reservation)
        {
            if (reservation == null)
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var data = _repo.AddReservation(reservation);
            var reservationDto = new ReservationDto
            {
                ReservationId = data.ReservationId,
                GuestsNr = data.GuestsNr,
                Date = data.Date,
                Hour = data.Hour,
                PhoneNumber = data.PhoneNumber,
                Email = data.Email,
                FullName = data.FullName,
                UserId = data.UserId
            };
            return CreatedAtAction("GetReservationById", new { Id = data.ReservationId }, reservationDto);

        }
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetReservationById(int id)
        {
            var obj = _repo.GetReservationById(id);
            if (obj == null)
            {
                return NotFound();
            }
            if (obj != null)
            {
                var reservationDto = new ReservationDto
                {
                    ReservationId = obj.ReservationId,
                    GuestsNr = obj.GuestsNr,
                    Date = obj.Date,
                    Hour = obj.Hour,
                    PhoneNumber = obj.PhoneNumber,
                    Email = obj.Email,
                    FullName = obj.FullName,
                    UserId = obj.UserId
                };
                return Ok(reservationDto);
            }
            return BadRequest();
        }
        [HttpGet]
        [Route("{time}/{hour}/{guests}")]
        public ActionResult<CheckReservationDto> CheckReservation( string time,string hour,int guests)
        {
            var reservation = _repo.CheckResevation(time, hour, guests);
            if (reservation)
            {
                return Ok("true");
            }
            else
            {
                return NotFound("false");
            }
            

        }
    }
}
