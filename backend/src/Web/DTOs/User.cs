namespace backend.Web.DTOs
{
    public record LoginRequest(string Email, string Password);
    public record UserRequest(string Name, string Email, string? Password = null);
    public record UserResponse(int Id, string Name, string Email, DateTime CreatedAt);
}