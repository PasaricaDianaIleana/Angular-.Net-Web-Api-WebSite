using RestaurantDataAccess;
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
        private readonly AppDbContext _context;

        public ItemRepository(AppDbContext context)
        {
            _context = context;
        }
        public Menu AddItem(Menu menu)
        {
            _context.Menu.Add(menu);
            _context.SaveChanges();
            return menu;
        }

        public Menu Delete(int id)
        {
            var item = _context.Menu.FirstOrDefault(i => i.Id==id);
            if (item != null)
            {
                _context.Remove(item);
                _context.SaveChanges();
            }
            return null;
        }

        public Menu EditItem(Menu menu)
        {
            var item = GetById(menu.Id);
            if (item != null)
            {
                item.Id = menu.Id; 
                item.Image = menu.Image;
                item.Name = menu.Name;
                item.Description = menu.Description;
                item.Price = menu.Price;
                item.SoldNr = menu.SoldNr;
                item.CategoryId = menu.CategoryId;
                _context.Update(item);
                _context.SaveChanges();
                return item;
            }
            return null;
        }

        public Menu GetById(int id)
        {
            return _context.Menu.FirstOrDefault(m => m.Id == id);
        }

        public List<Menu> GetItems()
        {
            return _context.Menu.ToList();
        }

        public List<Menu> GetItemsListById(int id)
        {
            return _context.Menu.OrderByDescending(m=>m.SoldNr).Where(m => m.CategoryId == id).Take(4).ToList();
        }
    }
}
