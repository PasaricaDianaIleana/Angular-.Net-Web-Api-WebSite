using Microsoft.AspNetCore.Mvc;
using RestaurantProjectWebApi.Models;
using RestaurantProjectWebApi.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantProjectWebApi.Controllers.CategoryController
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _repository;
        public CategoryController(ICategoryRepository repository)
        {
            _repository = repository;
        }
        [HttpGet]
        public List<CategoryDto> GetAll()
        {
            var categories = _repository.GetCategories()
                .Select(c => new CategoryDto
                {
                    CategoryId = c.CategoryId,
                    Name = c.Name
                });
            return categories.ToList();
        }
    }
}
