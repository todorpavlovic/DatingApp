using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class UserRepository : IUserRepository
  {
    private readonly DataContext _context;
    public UserRepository(DataContext context)
    {
      this._context = context;
    }

    public async Task<AppUser> GetUserByIdAsync(int id)
    {
      return await this._context.Users.FindAsync(id);
    }

    public async Task<AppUser> GetUserByUsernameAsync(string username)
    {
      return await this._context.Users.SingleOrDefaultAsync(x => x.UserName == username);
    }

    public async Task<IEnumerable<AppUser>> GetUsersAsync()
    {
      return await this._context.Users.ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
      return await this._context.SaveChangesAsync() > 0;
    }

    public void Update(AppUser user)
    {
      this._context.Entry(user).State = EntityState.Modified;
    }
  }
}