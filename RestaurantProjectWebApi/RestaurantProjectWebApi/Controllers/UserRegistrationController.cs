using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RestaurantDataAccess.Models;
using RestaurantProjectWebApi.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantProjectWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRegistrationController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public UserRegistrationController(UserManager<User> userManager,
                                          SignInManager<User> signInManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("Register")]
        //POST api/UserRegistration/Register
        public async Task<IActionResult> PostUser( UserRegistration model)
        {
            var user = new User()
            {
                UserName = model.UserName,
                Email = model.Email,
                FullName = model.FullName
            };
            try
            {
                var result =  await _userManager.CreateAsync(user, model.Password);

                return Ok(result);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] UserLogin model)
        {
            //find one user by name
            var user = await _userManager.FindByNameAsync(model.Username);
            var password = await _userManager.CheckPasswordAsync(user, model.Password);
            if (user != null && password )
            {
                var token = new SecurityTokenDescriptor
                {
                    //claims associated with the user
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserId", user.Id.ToString())
                    }),
                    //token expiration time
                    Expires = DateTime.UtcNow.AddMinutes(5),
                    SigningCredentials=new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("1234567890123456")),SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(token);
                var WriteToken = tokenHandler.WriteToken(securityToken);
                return Ok(new { WriteToken });
            }
            else
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }
         
        }
        [HttpGet]
        [Authorize]
        [Route("UserProfile")]
        public async Task<Object> GetUserProfile(int id)
        {
          
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            //get details about user
            var user = await _userManager.FindByIdAsync(userId);
            return new
            {
                user.FullName,
                user.Email,
                user.UserName
            };
            return Ok();
        }
    }
   
}
