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
    public class RSVPController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RSVPController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/rsvp
        [HttpGet]
        public async Task<IActionResult> GetAllRSVPs()
        {
            var rsvps = await _context.RSVPs.ToListAsync();
            return Ok(rsvps);
        }

        // POST: api/rsvp
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateRSVP([FromBody] RSVP rsvp)
        {
            if (rsvp == null) return BadRequest("Invalid RSVP data");

            _context.RSVPs.Add(rsvp);
            await _context.SaveChangesAsync();

            return Ok("RSVP created successfully.");
        }

        // PUT: api/rsvp/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRSVP(int id, RSVP updatedRSVP)
        {
            var existingRSVP = await _context.RSVPs.FindAsync(id);
            if (existingRSVP == null) return NotFound("RSVP not found.");

            existingRSVP.Status = updatedRSVP.Status;

            await _context.SaveChangesAsync();
            return Ok("RSVP updated successfully.");
        }

        // DELETE: api/rsvp/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRSVP(int id)
        {
            var rsvp = await _context.RSVPs.FindAsync(id);
            if (rsvp == null) return NotFound("RSVP not found.");

            _context.RSVPs.Remove(rsvp);
            await _context.SaveChangesAsync();
            return Ok("RSVP deleted successfully.");
        }
    }
}
