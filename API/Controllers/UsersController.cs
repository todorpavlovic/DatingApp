using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [Authorize]
  public class UsersController : BaseApiController
  {
    private readonly DataContext _context;
    public UsersController(DataContext context)
    {
      this._context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers() {
        var users = await this._context.Users.ToListAsync();
        
        return Ok(users); 
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AppUser>> GetUser(int id) {
        var user = await this._context.Users.FindAsync(id);

        return Ok(user);
    }
  }
}