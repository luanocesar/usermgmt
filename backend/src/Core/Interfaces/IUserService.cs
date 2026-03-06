using backend.Core.Models;
using backend.Infrastructure.Data;
using backend.Web.DTOs;

namespace backend.Core.Interfaces
{
    public interface IUserService
    {
        Task<UserResponse?> AuthenticateAsync(LoginRequest login);
        Task<UserResponse?> CreateAsync(UserRequest userDto);
        Task<IEnumerable<UserResponse>> GetAllAsync();
        Task<UserResponse?> UpdateAsync(int id, UserRequest dto);
        Task<bool> DeleteAsync(int id);
    }
}