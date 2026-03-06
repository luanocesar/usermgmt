using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using backend.Web.DTOs;
using backend.Core.Interfaces;

namespace backend.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController (
        IUserService userService,
        ITokenService tokenService
        ) : ControllerBase
    {
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginRequest login)
        {
            var user = await userService.AuthenticateAsync(login);
            if(user is null)
            {
                return Unauthorized(new
                {
                    message = "E-mail ou Senha inválidos."
                });
            }

            var token = tokenService.GenerateToken(user);
            return Ok(new
            {
                token,
                user
            });
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get() => Ok(await userService.GetAllAsync());

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] UserRequest dto)
        {
            var result = await userService.CreateAsync(dto);
            return CreatedAtAction(nameof(Get), new { id = result?.Id }, result);

        }
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            return await userService.DeleteAsync(id) ? NoContent() : NotFound();
        }
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Put(int id, [FromBody] UserRequest dto)
        {
            var result = await userService.UpdateAsync(id, dto);
            if(result is null) return NotFound();
            return Ok(result);
        }
    }
}