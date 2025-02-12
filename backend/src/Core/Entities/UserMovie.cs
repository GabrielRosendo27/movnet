namespace backend.src.Core.Entities
 
{
    public class UserMovie
    {
        public int UserId { get; set; }
        public UserModel? User { get; set; }

        public int MovieId { get; set; }
        public MovieModel? Movie { get; set; }

        public DateTime DateAdded { get; set; } 
    }
}