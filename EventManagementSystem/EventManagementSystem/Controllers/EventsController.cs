using EventManagementSystem.Data;
using EventManagementSystem.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EventManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Protects all endpoints
    public class EventsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EventsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/events
        [HttpGet]
        public async Task<IActionResult> GetAllEvents()
        {
            var events = await _context.Events.ToListAsync();
            return Ok(events);
        }

        // GET: api/events/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventById(int id)
        {
            var eventItem = await _context.Events.FindAsync(id);
            if (eventItem == null) return NotFound("Event not found.");
            return Ok(eventItem);
        }

        // POST: api/events
        [HttpPost]
        [Authorize(Roles = "Admin, Organizer")] // Restrict creation to Admins & Organizers
        public async Task<IActionResult> CreateEvent(Event eventItem)
        {
            _context.Events.Add(eventItem);
            await _context.SaveChangesAsync();
            return Ok("Event created successfully.");
        }

        // PUT: api/events/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin, Organizer")]
        public async Task<IActionResult> UpdateEvent(int id, Event updatedEvent)
        {
            var existingEvent = await _context.Events.FindAsync(id);
            if (existingEvent == null) return NotFound("Event not found.");

            existingEvent.Title = updatedEvent.Title;
            existingEvent.Description = updatedEvent.Description;
            existingEvent.Location = updatedEvent.Location;
            existingEvent.Date = updatedEvent.Date;
            existingEvent.MaxAttendees = updatedEvent.MaxAttendees;

            await _context.SaveChangesAsync();
            return Ok("Event updated successfully.");
        }

        // DELETE: api/events/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var eventItem = await _context.Events.FindAsync(id);
            if (eventItem == null) return NotFound("Event not found.");

            _context.Events.Remove(eventItem);
            await _context.SaveChangesAsync();
            return Ok("Event deleted successfully.");
        }
    }
}
