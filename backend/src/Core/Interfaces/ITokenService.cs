using backend.Web.DTOs;

namespace backend.Core.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(UserResponse user);
    }
}