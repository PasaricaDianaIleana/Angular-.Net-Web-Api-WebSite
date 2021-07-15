using RestaurantDataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantProjectWebApi.Repository
{
   public interface IItemsRepository
    {
        List<Menu> GetItems();
        Menu AddItem(Menu menu);
        Menu GetById(int id);
        Menu Delete(int id);
        Menu EditItem(Menu menu);
        List<Menu> GetItemsListById(int id);

    }
}
