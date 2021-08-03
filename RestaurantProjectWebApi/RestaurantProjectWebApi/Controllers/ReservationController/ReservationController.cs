using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantDataAccess.Models;
using RestaurantDataAccess.Repository;
using RestaurantProjectWebApi.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
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
        public async Task<List<ReservationDto>> GetAll()
        {
            var reservation = (await _repo.GetAllReservations())
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
                 });
            return reservation.ToList();
        }
        [HttpPost]
        public async Task<ActionResult> AddReservation([FromBody] Reservation reservation)
        {
            if (reservation == null)
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var data =await  _repo.AddReservation(reservation);
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
        [Route("User/{id}")]
        public async Task<IList<ReservationDto>> GetReservationById(string id)
        {
            
            var reservation = (await _repo.GetReservationsByUserId(id))
            .Select(data => new ReservationDto
            {
                ReservationId=data.ReservationId,
                FullName=data.FullName,
                Email=data.Email,
                Date=data.Date,
                GuestsNr=data.GuestsNr,
                Hour=data.Hour,
                PhoneNumber=data.PhoneNumber
                
            }).ToList();
            return reservation;
        }
        [HttpGet]
        [Route("data/{id}")]
        public async Task<ActionResult<ReservationDto>> GetReservationById(int id)
        {
            Debugger.Break();
            var obj = await _repo.GetReservationById(id);
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
        public async Task<ActionResult> CheckReservation( string time,string hour,int guests)
        {
            var reservation =await  _repo.CheckResevation(time, hour, guests);
            if (reservation)
            {
                return Ok();
            }
            else
            {
                return NotFound();
               
            }
        }
        [HttpGet]
        [Route("{date}")]
        public async Task<ActionResult<List<CheckReservationDto>>> GetReservationByDay(string date)
        {
            var reservation = (await _repo.GetReservation(date))
                .Select(r => new CheckReservationDto
            {
                Date = r.Date,
                GuestsNr = r.GuestsNr,
                Time = r.Hour
            }); 
            if (reservation == null)
            {
                return NotFound();
            }
            return reservation.ToList();
    
        }
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<ActionResult> DeleteAsync(int id)
        {
            var category = await _repo.GetReservationById(id);
            if(category is null)
            {
                return NotFound();
            }
            await _repo.DeleteReservation(id);
            return NoContent();
        }
        [HttpPut]
        [Route("{id:int}")]
        public async Task<ActionResult<Reservation>> UpdateReservationAsync(int id,Reservation reservation)
        {
            if (id != reservation.ReservationId)
                return BadRequest();
            var dataToUpdate =await _repo.GetReservationById(id);
            if(dataToUpdate is null)
            {
                return NotFound();
            }
            return await _repo.EditReservation(dataToUpdate);
        }
    }
}
