using RestaurantDataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantProjectWebApi.Repository
{
   public interface ICategoryRepository
    {
        List<Category> GetCategories();
        Category GetCategoryById(int id);
        Category AddCategory(Category category);


    }
}
