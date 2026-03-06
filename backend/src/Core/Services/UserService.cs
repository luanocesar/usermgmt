using backend.Core.Models;
using backend.Core.Interfaces;
using backend.Infrastructure.Data;
using backend.Web.DTOs;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace backend.Core.Services
{
    public class UserService(AppDbContext database) : IUserService
    {

        public async Task<UserResponse?> AuthenticateAsync(LoginRequest login)
        {
            var user = await database.Users.FirstOrDefaultAsync(user => user.Email == login.Email);

            try
            {
                if(user == null || !BCrypt.Net.BCrypt.Verify(login.Password, user.Password))
                {
                    return null;
                }
            }
            catch (BCrypt.Net.SaltParseException)
            {
                return null;
            }

            return UserResponseHandler(user);
        }

        public async Task<UserResponse?> CreateAsync(UserRequest dto)
        {
            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            database.Users.Add(user);
            await database.SaveChangesAsync();

            return UserResponseHandler(user);
        }

        public async Task<UserResponse?> UpdateAsync(int id, UserRequest dto)
        {
            var user = await database.Users.FindAsync(id);
            if(user is null) return null;

            user.Name = dto.Name;
            user.Email = dto.Email;
            if (!string.IsNullOrWhiteSpace(dto.Password))
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            }

            await database.SaveChangesAsync();

            return UserResponseHandler(user);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var user = await database.Users.FindAsync(id);
            if(user == null) return false;

            database.Users.Remove(user);
            await database.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<UserResponse>> GetAllAsync()
        {
            return await database.Users
            .Select(user=> UserResponseHandler(user))
            .ToListAsync();
        }

        private static UserResponse UserResponseHandler(User user)
            => new(user.Id, user.Name, user.Email, user.CreatedAt);
    }
}