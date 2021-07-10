using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantDataAccess.Models;
using RestaurantProjectWebApi.Models;
using RestaurantProjectWebApi.Repository;
using Microsoft.AspNetCore.Hosting;
namespace RestaurantProjectWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantController : ControllerBase
    {
        private readonly IItemsRepository _repository;
        private readonly IHostingEnvironment _hostEnvironment;
        public RestaurantController(IItemsRepository repository,IHostingEnvironment hostEnvironment)
        {
            _repository = repository;
            _hostEnvironment = hostEnvironment;
        }
        [HttpGet]
        public List<MenuItemsDto> GetAll()
        {
            var item = _repository.GetItems()
                .Select(i => new MenuItemsDto
                {
                    Id=i.Id,
                    Image= String.Format("{0}/{1}", "https://localhost:44366/api/Restaurant/image", i.Id),
                     Name =i.Name,
                    Description=i.Description,
                    Price=i.Price,
                    CategoryId=i.CategoryId
                });
            return item.ToList();
        }
        [HttpPost]
        public IActionResult AddItem([FromBody] Menu menu)
        {
            if (menu == null)
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var item = _repository.AddItem(menu);
            var itemDto = new MenuItemsDto()
            {
                Id = item.Id,
                Image = item.Image,
                Name = item.Name,
                Description = item.Description,
                Price = item.Price,
                CategoryId = item.CategoryId

            };
            return CreatedAtAction("GetAll", new { Id = item.Id }, itemDto);
        }
        [HttpPost]
        [Route("image/{id}")]
        public IActionResult AddImage([FromRoute] int id, [FromForm] IFormFile file)
        {
            var imagePath = Path.Combine(_hostEnvironment.WebRootPath, "Images", file.FileName);
            using (var streamImage = new FileStream(imagePath, FileMode.Create)) 
            {
                file.CopyTo(streamImage);
            }
            var item = _repository.GetItemById(id);
            item.Image = file.FileName;
            _repository.EditItem(item);
            return Ok();
        }

        [HttpGet]
        [Route("image/{id}")]
        public IActionResult GetImage([FromRoute] int id)
        {
            var item = _repository.GetItemById(id);
            var image = item.Image;
            var imgPath = Path.Combine(_hostEnvironment.WebRootPath, "images",image);
            var imageFile = System.IO.File.OpenRead(imgPath);
            return File(imageFile, "image/jpeg");
        }
        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteItem(int id)
        {
            try
            {
                var data = _repository.GetItemById(id);
                if (data == null)
                {
                    return NotFound();
                }
                var item = _repository.Delete(id);
                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}