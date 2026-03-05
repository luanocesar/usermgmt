using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
    {
        /*
            - It was necessary to include "string.Empty" on Required properties due to NullReferenceException on .NET
            - Best practice to avoid disabling the "Null Reference Checking" and lose a good guard
            - To keep Emptiness input prevention, it was added MinLength and AllowEmptyStrings attributes
        */
        [Key]
        public int Id { get; set; }
        [Required(AllowEmptyStrings = false)]
        [StringLength(100), MinLength(3)]
        public string Name { get; set;} = string.Empty;
        [Required]
        [EmailAddress]
        public string Email { get; set;} = string.Empty;
        [Required]
        [RegularExpression(@"^\S{6,}$", ErrorMessage = "A senha precisa ter no mínimo 6 caracteres, e não pode conter espaços.")]
        public string Password { get; set;} = string.Empty;
        public DateTime CreateAt { get; set;} = DateTime.UtcNow;
    }
}