using RestaurantDataAccess;
using RestaurantDataAccess.Models;
using RestaurantProjectWebApi.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantProjectWebApi.DataRepository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AppDbContext _context;
        public CategoryRepository(AppDbContext context)
        {
            _context = context;
        }
        public Category AddCategory(Category category)
        {
          _context.Categories.Add(category);
            _context.SaveChanges();
            return category;
        }

        public List<Category> GetCategories()
        {
            return _context.Categories.ToList();
        }

        public Category GetCategoryById(int id)
        {
            return _context.Categories.FirstOrDefault(c => c.CategoryId == id);
       
        }
    }
}
