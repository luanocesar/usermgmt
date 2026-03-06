using backend.Infrastructure.Data;
using backend.Core.Models;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace backend.Web.Extensions
{
    public static class DataExtensions
    {
        public static void ApplyMigrationsAndSeed(this IApplicationBuilder app)
{
        using var scope = app.ApplicationServices.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        context.Database.Migrate();

        // 1. Remove TODOS os usuários com este email para limpar o lixo
        var validEmail = "admin@email.com";
        var usersToDelete = context.Users.Where(u => u.Email == validEmail).ToList();
        if (usersToDelete.Any())
        {
            context.Users.RemoveRange(usersToDelete);
            context.SaveChanges();
        }

        // 2. Agora insere UM ÚNICO admin com o hash correto
        context.Users.Add(new User
        {
            Name = "admin",
            Email = validEmail,
            Password = BCrypt.Net.BCrypt.HashPassword("admin123"),
            CreatedAt = DateTime.UtcNow // Garanta que seu modelo suporte isso
        });

        context.SaveChanges();
}

        /*
        public static void ApplyMigrationsAndSeed(this IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            
            var adminUser = context.Users.FirstOrDefault(u => u.Email == "admin@mail.com");

            if (adminUser == null)
            {
                // Se não existir nada, cria do zero
                context.Users.Add(new User
                {
                    Name = "admin",
                    Email = "admin@mail.com",
                    Password = BCrypt.Net.BCrypt.HashPassword("admin123")
                });
            }
            else
            {
                // Se o usuário já existe (o seu caso atual), forçamos o Hash na senha dele
                // Isso vai corrigir o registro que está quebrado no seu SQLite
                adminUser.Password = BCrypt.Net.BCrypt.HashPassword("admin123");
            }

            context.SaveChanges();
        }
    */}
}
