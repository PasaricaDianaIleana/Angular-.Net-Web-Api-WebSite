using RestaurantDataAccess.Models;
using RestaurantProjectWebApi.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantProjectWebApi.DataRepository
{
    public class ItemRepository : IItemsRepository
    {
        public Menu AddItem(Menu menu)
        {
            throw new NotImplementedException();
        }

        public Menu Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Menu EditItem(Menu menu)
        {
            throw new NotImplementedException();
        }

        public Menu GetItemById(int id)
        {
            throw new NotImplementedException();
        }

        public List<Menu> GetItems()
        {
            throw new NotImplementedException();
        }

        public List<Menu> GetItemsListById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
