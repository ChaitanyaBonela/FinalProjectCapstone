using EventManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace EventManagementSystem.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<RSVP> RSVPs { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed Data for Users
            modelBuilder.Entity<User>().HasData(
                new User { UserID = 1, Username = "admin", PasswordHash = "hashedpassword1", Email = "admin@example.com", Role = "Admin" },
                new User { UserID = 2, Username = "organizer1", PasswordHash = "hashedpassword2", Email = "organizer1@example.com", Role = "Organizer" },
                new User { UserID = 3, Username = "attendee1", PasswordHash = "hashedpassword3", Email = "attendee1@example.com", Role = "Attendee" }
            );

            // Seed Data for Events
            modelBuilder.Entity<Event>().HasData(
                new Event { EventID = 1, Title = "Tech Conference 2025", Description = "A conference on emerging technologies.", Location = "Tech Park, NYC", Date = new DateTime(2025, 6, 15), MaxAttendees = 200 },
                new Event { EventID = 2, Title = "Music Fest 2025", Description = "An exciting music festival with live bands.", Location = "Central Park, LA", Date = new DateTime(2025, 7, 10), MaxAttendees = 500 }
            );

           
        
            modelBuilder.Entity<RSVP>().ToTable("RSVP");



            modelBuilder.Entity<Notification>().HasOne<User>();
                

            base.OnModelCreating(modelBuilder);
        }
    }
}
